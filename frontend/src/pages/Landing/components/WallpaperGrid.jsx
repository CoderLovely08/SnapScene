import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/api.constants";
import React, { useState } from "react";
import WallpaperCard from "./WallpaperCard";
import WallpaperCardSkeleton from "./WallpaperCardSkeleton";
import NoWallpapersFound from "./NoWallpaperFound";

const WallpaperGrid = ({ likedImages, setLikedImages }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { responseData: wallpapers, responseIsLoading } = useFetch(
    apiRoutes.WALLPAPERS.GET_ALL,
    QUERY_KEYS.WALLPAPERS.GET_ALL
  );

  const categories = ["All", "Nature", "Urban", "Abstract", "Space", "Minimal"];

  const filteredWallpapers = wallpapers?.filter((wallpaper) => {
    if (selectedCategory === "All") return true;
    return wallpaper.category === selectedCategory;
  });

  return (
    <>
      {/* Category Filter */}
      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responseIsLoading ? (
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <WallpaperCardSkeleton key={item} />
              ))
            ) : filteredWallpapers?.length > 0 ? (
              filteredWallpapers?.map((wallpaper) => (
                <WallpaperCard
                  key={wallpaper.id}
                  wallpaper={wallpaper}
                  likedImages={likedImages}
                  setLikedImages={setLikedImages}
                />
              ))
            ) : (
              <NoWallpapersFound selectedCategory={selectedCategory} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WallpaperGrid;
