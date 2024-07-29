import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginapi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: login , isLoading} = useMutation({
        mutationFn: ({
            email, password
        }) => loginapi({
            email, password
        }), onSuccess: (user) =>  {
            queryClient.setQueryData(['user'], user.user);
            toast.success(`${user.user.email} is loged in`)
            navigate('/dashboard',{replace: true});
        },
        onError: (err) => {
            console.log(err)
            toast.error('provided email or password are incorrect');
        }
    });
    return {login, isLoading};
}