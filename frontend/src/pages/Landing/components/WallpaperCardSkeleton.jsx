import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const WallpaperCardSkeleton = () => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 animate-pulse">
      {/* Image Placeholder */}
      <div className="relative aspect-[4/3] bg-muted/20" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Avatar + Title */}
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full bg-muted/20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-muted/20" />
            <Skeleton className="h-3 w-20 bg-muted/20" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex space-x-6">
            <Skeleton className="h-4 w-6 bg-muted/20" />
            <Skeleton className="h-4 w-6 bg-muted/20" />
          </div>
          <Skeleton className="h-4 w-20 bg-muted/20" />
        </div>
      </div>
    </div>
  );
};

export default WallpaperCardSkeleton;
