import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useDownloadWallpaper,
  useLikeWallpaper,
} from "@/hooks/app/useWallpaper";
import { getInitials, getTimedifference } from "@/utils/app.utils";
import { Calendar, Download, Heart, Share2Icon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

const WallpaperCard = ({ wallpaper, likedImages, setLikedImages }) => {
  const { onSubmit, isDownloadPending } = useDownloadWallpaper(wallpaper?.id);
  const { likeWallpaper, isPending } = useLikeWallpaper(wallpaper?.id);
  const handleLike = (id) => {
    likeWallpaper(id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={wallpaper?.imageUrl}
          alt={wallpaper?.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-3">
            <button
              onClick={() => onSubmit(wallpaper?.id)}
              className="bg-primary backdrop-blur-sm p-3 rounded-full text-white hover:bg-primary/80 transition-colors"
            >
              {isDownloadPending ? (
                <LoadingSpinner />
              ) : (
                <Download className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => handleLike(wallpaper?.id)}
              className={`backdrop-blur-sm p-3 rounded-full transition-colors bg-primary ${
                likedImages.has(wallpaper?.id)
                  ? "bg-red-500/80 text-white"
                  : "bg-red-500 text-white hover:bg-red-500/80"
              }`}
            >
              {isPending ? (
                <LoadingSpinner spinnerColor="text-white" />
              ) : (
                <Heart
                  className={`h-5 w-5 ${
                    likedImages.has(wallpaper?.id) ? "fill-current" : ""
                  }`}
                />
              )}
            </button>
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="bg-primary backdrop-blur-sm p-3 rounded-full text-white hover:bg-primary/80 transition-colors"
            >
              <Share2Icon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Resolution Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white font-medium">
          {wallpaper?.quality}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar>
            <AvatarImage src={wallpaper?.authorAvatar} />
            <AvatarFallback>
              {getInitials(wallpaper?.uploader?.fullName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-white font-semibold text-lg">
              {wallpaper?.title}
            </h3>
            <p className="text-white/60 text-sm">
              by {wallpaper?.uploader?.fullName}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-white/60">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{wallpaper?.likes?.length}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>{wallpaper?.downloadCount}</span>
            </span>
          </div>
          <span className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{getTimedifference(wallpaper?.uploadedAt)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;
