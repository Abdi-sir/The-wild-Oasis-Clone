import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { Page_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient =  useQueryClient();
  const [searchParams] =  useSearchParams();
  //Filter
  const filterValue =  searchParams.get("status");
  const filter = !filterValue || filterValue === 'all' ? null : {field: 'status', value:filterValue};
     // for greater than   {field: "tottalPrcie" , value: 5000, method: "gte}
  //SortBy
  
  const sortByRaw = searchParams.get("sortBy") || "startDate- desc";
  const [field, direction] =  sortByRaw.split("-");
  const sortBy = {field, direction};
   
  //Pagination
  const page = !searchParams.get('page')
  ? 1
  : Number(searchParams.get('page'));
  
  //Query
  const {
    isLoading,
    data: {data: bookings, count} = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: ()=> getBookings({filter, sortBy, page}),
  });

  //pre fetching
  const pageCount = Math.ceil(count / Page_SIZE);
  if(page< pageCount)
  queryClient.prefetchQuery({
    queryKey: ['bookings', filter, sortBy, page + 1],
    queryFn: ()=> getBookings({filter, sortBy, page: page + 1}),
  });
  if(page > 1)
  queryClient.prefetchQuery({
    queryKey: ['bookings', filter, sortBy, page - 1],
    queryFn: ()=> getBookings({filter, sortBy, page: page - 1}),
  });
 
  
  return { isLoading, error, bookings, count};
}
