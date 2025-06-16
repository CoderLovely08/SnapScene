import { useMutation } from "@tanstack/react-query";

export const useCustomMutation = (mutationFn, onSuccess, onError) => {
  const { mutate: performMutation, isPending: isPendingMutation } = useMutation(
    {
      mutationFn,
      onSuccess,
      onError,
    }
  );

  return {
    performMutation,
    isPendingMutation,
  };
};
