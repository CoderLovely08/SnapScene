import { handlePostRequest } from "@/api/common.api";
import { apiRoutes, QUERY_KEYS } from "@/utils/api.constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDownloadWallpaper = (id) => {
  const queryClient = useQueryClient();
  const onSubmit = () => {
    downloadWallpaper();
  };

  const { mutate: downloadWallpaper, isPending: isDownloadPending } =
    useMutation({
      mutationFn: () =>
        handlePostRequest(apiRoutes.WALLPAPERS.DOWNLOAD, {
          id,
        }),
      onSuccess: (response) => {
        queryClient.setQueryData([QUERY_KEYS.WALLPAPERS.GET_ALL], (oldData) => {
          return {
            ...oldData,
            data: oldData?.data?.map((wallpaper) => {
              if (wallpaper?.id === id) {
                return {
                  ...wallpaper,
                  downloadCount: response?.data?.downloadCount,
                };
              }
              return wallpaper;
            }),
          };
        });
        // Download the file
        const url = response?.data?.imageUrl;
        const link = document.createElement('a');
        link.href = url;
        link.download = 'wallpaper.jpg';
        link.click();
        toast.success("Wallpaper downloaded");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });

  return { onSubmit, isDownloadPending };
};
