import React, { useState } from "react";
import Navbar from "@/components/core/Navbar";
import WallpaperGrid from "./components/WallpaperGrid";
import UploadDialog from "@/components/core/UploadDialog";

const LandingPage = () => {
  const [likedImages, setLikedImages] = useState(new Set());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Amazing Wallpapers
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Upload, explore, and download stunning wallpapers from creators
            around the world. Join our community and share your visual
            masterpieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
              Start Exploring
            </button>
            <UploadDialog>
              <button className="border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all">
                Upload Your Art
              </button>
            </UploadDialog>
          </div>
        </div>
      </section>

      <WallpaperGrid
        likedImages={likedImages}
        setLikedImages={setLikedImages}
      />

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-white text-lg font-bold">SnapScene</span>
          </div>
          <p className="text-white/60 mb-4">
            Discover and share amazing wallpapers with the world
          </p>
          <p className="text-white/40 text-sm">
            Built with AWS • EC2 • S3 • RDS • CloudFront • CloudWatch
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
