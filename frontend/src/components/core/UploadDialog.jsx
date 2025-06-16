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
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/auth.slice";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/utils/app.constants";

const UploadDialog = ({ children }) => {
  const { uploadForm, onSubmit, isUploadPending, open, setOpen } =
    useUploadWallpaper();
  const user = useSelector(selectUser);
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
        {user ? (
          <UploadWallpaperForm
            uploadForm={uploadForm}
            onSubmit={onSubmit}
            isUploadPending={isUploadPending}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/20">
              <LogIn className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">Login Required</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                You need to be logged in to upload wallpapers. Please sign in to
                continue.
              </p>
            </div>
            <Link to={routes.AUTH.LOGIN}>
              <button className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-medium text-white transition-all hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
