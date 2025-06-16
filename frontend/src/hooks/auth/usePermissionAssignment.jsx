import { handlePostRequest } from "@/api/common.api";
import { permissionAssignmentSchema } from "@/schemas/schemas";
import { apiRoutes } from "@/utils/api.constants";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export const usePermissionAssignment = () => {
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    const { userId, selectedPermissions } = data;

    const result = permissionAssignmentSchema.safeParse({
      userId,
      permissions: selectedPermissions,
    });
    if (!result.success) {
      if (result.error?.message) {
        const errorMessage = JSON.parse(result.error.message)[0];
        console.log(errorMessage);

        toast.error(errorMessage?.message);
      }
    } else {
      assignPermissions(result.data);
    }
  };

  const { mutate: assignPermissions, isPending } = useMutation({
    mutationFn: (data) =>
      handlePostRequest(apiRoutes.CORE.PERMISSIONS.ASSIGN_PERMISSIONS, data),
    onSuccess: () => {
      toast.success("Permissions assigned successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { onSubmit, isPending, open, setOpen };
};
