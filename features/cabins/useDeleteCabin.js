import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi} from "../../services/apiCabins";

 export function useDeleteCabin(){
    const queryclient = useQueryClient();
    
 const {isLoading: isDeleting, mutate: deleteCabin} =  useMutation({
    mutationFn : deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      queryclient.invalidateQueries({
        queryKey: ['cabin'],
      });
    },
    onError : err => toast.error(err.message)
  })
  return {isDeleting, deleteCabin}
}

