import { handlePostRequest } from "@/api/common.api";
import { apiRoutes, QUERY_KEYS } from "@/utils/api.constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { uploadWallpaperSchema } from "@/schemas/schemas";
import { routes } from "@/utils/app.constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLikes } from "@/store/slices/auth.slice";

export const useUploadWallpaper = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const uploadForm = useForm({
    resolver: zodResolver(uploadWallpaperSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      quality: "",
      image: null,
    },
  });

  const onSubmit = (data) => {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("category", data.category);
    formData.append("quality", data.quality);
    formData.append("wallpaper", data.image);

    uploadMutation(formData);
  };

  const { mutate: uploadMutation, isPending: isUploadPending } = useMutation({
    mutationFn: (formData) =>
      handlePostRequest(apiRoutes.WALLPAPERS.UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

    onSuccess: (data) => {
      toast.success("Wallpaper uploaded successfully!");
      navigate(routes.CORE.path);
      setOpen(false);
      uploadForm.reset();
    },

    onError: (error) => {
      toast.error(error?.message || "Upload failed. Please try again.");
    },
  });

  return { uploadForm, onSubmit, isUploadPending, open, setOpen };
};

export const useDownloadWallpaper = (id, downloadLink) => {
  const queryClient = useQueryClient();
  const user = useSelector(selectUser);
  const onSubmit = () => {
    if (user) {
      downloadWallpaper();
    } else {
      const link = document.createElement("a");
      link.href = downloadLink;
      link.target = "_blank";
      link.download = "wallpaper.jpg";
      link.click();
    }
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
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.download = "wallpaper.jpg";
        link.click();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });

  return { onSubmit, isDownloadPending };
};

export const useLikeWallpaper = (id) => {
  const dispatch = useDispatch();
  const { mutate: likeWallpaper, isPending } = useMutation({
    mutationFn: (data) =>
      handlePostRequest(apiRoutes.WALLPAPERS.LIKE, {
        id,
      }),
    onSuccess: (response) => {
      dispatch(setLikes(response?.data));
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { likeWallpaper, isPending };
};
