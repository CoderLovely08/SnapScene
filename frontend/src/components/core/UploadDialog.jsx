import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadWallpaperForm from "./UploadWallpaperForm";
import { useUploadWallpaper } from "@/hooks/app/useWallpaper";

const UploadDialog = ({ children }) => {
  const { uploadForm, onSubmit, isUploadPending, open, setOpen } =
    useUploadWallpaper();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Wallpaper</DialogTitle>
          <DialogDescription>
            Upload your wallpaper to our platform and share it with the world.
          </DialogDescription>
        </DialogHeader>
        <UploadWallpaperForm
          uploadForm={uploadForm}
          onSubmit={onSubmit}
          isUploadPending={isUploadPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
