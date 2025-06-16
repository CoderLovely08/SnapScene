import { selectUser } from "@/store/slices/auth.slice";
import { routes } from "@/utils/app.constants";
import { Search, Upload } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserProfileCard from "./UserProfileCard";
import { useLogout } from "@/hooks/auth/useLogin";
import UploadDialog from "./UploadDialog";

const Navbar = () => {
  const user = useSelector(selectUser);
  const { logutAdmin } = useLogout();

  const handleLogout = () => {
    // Wire this with your logout hook
    logutAdmin();
  };

  return (
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={routes.CORE.path}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SnapScene
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {/* Upload Button */}
            <UploadDialog>
              <button className="hidden md:flex text-white/80 hover:text-white transition-colors items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-full">
                <Upload className="h-5 w-5" />
                <span>Upload</span>
              </button>
            </UploadDialog>

            {/* Search Button - Mobile */}
            <button className="md:hidden text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
              <Search className="h-5 w-5" />
            </button>

            {/* User Section */}
            {user ? (
              <UserProfileCard user={user} onLogout={handleLogout} />
            ) : (
              <Link to={routes.AUTH.LOGIN}>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
