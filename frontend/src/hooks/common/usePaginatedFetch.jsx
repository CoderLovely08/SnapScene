import { handleGetRequest } from "@/api/common.api";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const usePaginatedFetch = (urlBuilder, queryKey, options = {}) => {
  const generatedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];

  const {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: generatedQueryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const url = urlBuilder(pageParam);
      return await handleGetRequest(url);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.data?.hasNext) {
        return allPages.length + 1;
      }
      return undefined;
    },
    placeholderData: keepPreviousData,
  });

  if (isError && options.showToast) {
    toast.error(error?.message);
  }

  return {
    pages: data?.pages?.map((p) => p.data?.data || []),
    flatData: data?.pages?.flatMap((p) => p.data?.data || []),
    isLoading,
    isSuccess,
    isError,
    errorMessage: error?.message,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};
