import { handlePostRequest } from "@/api/common.api";
import { loginFormSchema, registerFormSchema } from "@/schemas/schemas";
import { clearUser, setUser } from "@/store/slices/auth.slice";
import { apiRoutes } from "@/utils/api.constants";
import { routes } from "@/utils/app.constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate(routes.CORE.path);
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
  const navigate = useNavigate();

  const logutAdmin = () => {
    let confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      logoutMutation();
    }
  };

  const { mutate: logoutMutation, isPending: isLogoutPending } = useMutation({
    mutationFn: () => handlePostRequest(apiRoutes.AUTH.LOGOUT),

    onSuccess: () => {
      dispatch(clearUser());
      navigate(routes.AUTH.LOGIN);
      toast.success("Logout successful");
    },

    onError: (error) => {
      toast.error(error?.message || "Logout failed");
    },
  });

  return { logutAdmin };
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegisterForm = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    registerMutation(data);
  };

  const { mutate: registerMutation, isPending: isRegisterPending } =
    useMutation({
      mutationFn: (data) => handlePostRequest(apiRoutes.AUTH.REGISTER, data),

      onSuccess: (data) => {
        dispatch(setUser(data?.data));
        navigate(routes.AUTH.LOGIN);
        toast.success("Registration successful, please login");
      },

      onError: (error) => {
        toast.error(error?.message || "Registration failed");
      },
    });
  return { userRegisterForm, onSubmit, isRegisterPending };
};
