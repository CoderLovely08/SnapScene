import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ViewAllPermissions from "./ViewAllPermissions";
import { usePermissionAssignment } from "@/hooks/auth/usePermissionAssignment";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AssignPermissions = ({ userId, permissions, children }) => {
  const mappedPermissions = permissions?.map((permission) => permission.id);

  const [selectedPermissions, setSelectedPermissions] = useState(
    mappedPermissions || []
  );

  const { onSubmit, isPending, open, setOpen } = usePermissionAssignment();

  // Handle permission toggle
  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      }
      return [...prev, permissionId];
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Assign Permissions</DialogTitle>
        </DialogHeader>
        <ViewAllPermissions
          togglePermission={togglePermission}
          selectedPermissions={selectedPermissions}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => onSubmit({ userId, selectedPermissions })}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignPermissions;
