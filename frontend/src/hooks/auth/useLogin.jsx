import { handlePostRequest } from "@/api/common.api";
import { loginFormSchema } from "@/schemas/schemas";
import { setUser } from "@/store/slices/auth.slice";
import { apiRoutes } from "@/utils/api.constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const useLogin = () => {
    const dispatch = useDispatch();

    const adminLoginForm = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        signInMutation(data);
    };

    const { mutate: signInMutation, isPending: isSignInPending } = useMutation({
        mutationFn: (data) => handlePostRequest(apiRoutes.AUTH.LOGIN, data),

        onSuccess: (data) => {
            dispatch(setUser(data?.data));

            toast.success("Login successful");
        },

        onError: (error) => {
            toast.error(error?.message || "Login failed");
        },
    });

    return { adminLoginForm, onSubmit, isSignInPending };
};

export const useLogout = () => {
    const dispatch = useDispatch();

    const logutAdmin = () => {
        let confirmLogout = window.confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            dispatch(setUser(null));
            toast.success("Logout successful");
            // logoutMutation();
        }
    };

    // const { mutate: logoutMutation, isPending: isLogoutPending } = useMutation({
    //     mutationFn: () => handlePostRequest(apiRoutes.AUTH.ADMIN_LOGOUT),

    //     onSuccess: () => {},

    //     onError: (error) => {
    //         toast.error(error?.message || "Logout failed");
    //     },
    // });

    return { logutAdmin };
};
