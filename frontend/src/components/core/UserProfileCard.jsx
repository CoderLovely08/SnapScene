import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/app.utils";
import { LogOut, User, Settings, Heart, Download } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const UserProfileCard = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const triggerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  return (
    <div className="relative">
      {/* Profile Trigger */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-full hover:bg-white/10 transition-all duration-200 group"
      >
        <Avatar className="h-8 w-8 ring-2 ring-transparent group-hover:ring-purple-500/50 transition-all">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
            {getInitials(user?.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="hidden lg:block text-left">
          <p className="text-white font-medium text-sm leading-none">
            {user?.fullName}
          </p>
          <p className="text-white/60 text-xs mt-1">{user?.email}</p>
        </div>
      </button>

      {/* Dropdown Card */}
      {isOpen && (
        <div
          ref={cardRef}
          className="absolute right-0 top-full mt-2 w-72 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 ring-2 ring-white/20">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {getInitials(user?.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg leading-none">
                  {user?.fullName}
                </h3>
                <p className="text-white/60 text-sm mt-1 truncate">
                  {user?.email}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-white/50">
                    Joined{" "}
                    {new Date(user?.createdAt || Date.now()).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-6 py-4 border-b border-white/10">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-pink-400">
                  <Heart className="h-4 w-4" />
                  <span className="text-white font-semibold">
                    {user?.likedWallpapers?.length || 0}
                  </span>
                </div>
                <p className="text-white/50 text-xs mt-1">Liked</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-purple-400">
                  <Download className="h-4 w-4" />
                  <span className="text-white font-semibold">
                    {user?.downloadCount || 0}
                  </span>
                </div>
                <p className="text-white/50 text-xs mt-1">Downloads</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
