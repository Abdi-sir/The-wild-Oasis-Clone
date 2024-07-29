import { useMutation } from "@tanstack/react-query";
import { signup as signupapi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup(){
    const {isLoading, mutate:  signup} = useMutation({
        mutationFn: signupapi,
        onSuccess: (user) => {
            console.log(user)
            toast.success("Account successfully created! Please verify the new account from the user's email address.");
            
        }

    });
    return {signup, isLoading}
}