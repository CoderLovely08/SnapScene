import { handleGetRequest } from "@/api/common.api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useFetch = (url, queryKey, options) => {
  const generatedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];

  const {
    data: responseData,
    error: responseError,
    isLoading: responseIsLoading,
    isSuccess: responseIsSuccess,
    isError: responseIsError,
    isFetched: responseIsFetched,
  } = useQuery({
    queryKey: generatedQueryKey,
    queryFn: async () => handleGetRequest(url),
  });

  if (responseIsError && options?.showToast) {
    toast.error(responseError?.message);
  }

  return {
    responseData: responseData?.data,
    responseError: responseError?.message,
    responseIsLoading,
    responseIsSuccess,
    responseIsError,
    responseIsFetched,
  };
};