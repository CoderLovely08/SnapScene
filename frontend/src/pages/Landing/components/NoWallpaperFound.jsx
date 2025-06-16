import { Search, Image, Sparkles, RefreshCw } from "lucide-react";
import React from "react";

const NoWallpapersFound = ({ selectedCategory, onReset }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center px-4">
      <div className="relative z-10">
        {/* Main container */}
        <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-12 max-w-md mx-auto text-center">
          {/* Animated icon container */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full inline-block">
              <div className="bg-white/10 p-4 rounded-full">
                <Search className="h-12 w-12 text-white/60" />
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-2 -right-2 bg-purple-500/30 p-2 rounded-full animate-pulse">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-1 -left-1 bg-pink-500/30 p-2 rounded-full animate-pulse delay-300">
              <Image className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3">
            No Wallpapers Found
          </h3>

          {/* Description */}
          <p className="text-white/60 mb-6 leading-relaxed">
            {selectedCategory === "All"
              ? "We couldn't find any wallpapers at the moment. Try refreshing or check back later!"
              : `No wallpapers found in the "${selectedCategory}" category. Try exploring other categories or search for something different.`}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {selectedCategory !== "All" && onReset && (
              <button
                onClick={onReset}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                View All Wallpapers
              </button>
            )}

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Additional suggestions */}
      <div className="mt-8 text-center">
        <p className="text-white/40 text-sm mb-4">
          Popular categories to explore:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Nature", "Abstract", "Space", "Minimal"].map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-xs text-white/60 border border-white/10"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoWallpapersFound;
