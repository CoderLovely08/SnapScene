import React, { useState } from 'react';
import { Heart, Download, MessageCircle, Search, User, Upload, Menu, X, Filter, Grid, Eye, Calendar, Tag } from 'lucide-react';

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likedImages, setLikedImages] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy wallpaper data
  const wallpapers = [
    {
      id: 1,
      title: "Neon Cityscape",
      author: "Alex Chen",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
      category: "Urban",
      likes: 1247,
      downloads: 892,
      comments: 23,
      tags: ["neon", "city", "night", "urban"],
      uploadDate: "2 days ago",
      resolution: "4K"
    },
    {
      id: 2,
      title: "Mountain Serenity",
      author: "Sarah Wilson",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "Nature",
      likes: 2134,
      downloads: 1456,
      comments: 67,
      tags: ["mountain", "landscape", "nature", "peaceful"],
      uploadDate: "1 week ago",
      resolution: "8K"
    },
    {
      id: 3,
      title: "Abstract Gradient",
      author: "David Park",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "Abstract",
      likes: 756,
      downloads: 523,
      comments: 12,
      tags: ["gradient", "abstract", "colorful", "modern"],
      uploadDate: "3 days ago",
      resolution: "4K"
    },
    {
      id: 4,
      title: "Ocean Waves",
      author: "Emma Torres",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
      category: "Nature",
      likes: 1823,
      downloads: 1234,
      comments: 45,
      tags: ["ocean", "waves", "blue", "calming"],
      uploadDate: "5 days ago",
      resolution: "6K"
    },
    {
      id: 5,
      title: "Space Nebula",
      author: "Marcus Kim",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
      category: "Space",
      likes: 3421,
      downloads: 2156,
      comments: 89,
      tags: ["space", "nebula", "stars", "cosmic"],
      uploadDate: "1 day ago",
      resolution: "8K"
    },
    {
      id: 6,
      title: "Forest Path",
      author: "Lisa Chen",
      authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      category: "Nature",
      likes: 967,
      downloads: 678,
      comments: 34,
      tags: ["forest", "path", "green", "tranquil"],
      uploadDate: "4 days ago",
      resolution: "4K"
    }
  ];

  const categories = ["All", "Nature", "Urban", "Abstract", "Space", "Minimal"];

  const handleLike = (id) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedImages(newLiked);
  };

  const filteredWallpapers = wallpapers.filter(wallpaper => {
    const matchesCategory = selectedCategory === 'All' || wallpaper.category === selectedCategory;
    const matchesSearch = wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wallpaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SnapScene
              </span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search wallpapers, tags, or creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-2 pl-12 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <Search className="absolute left-4 top-2.5 h-5 w-5 text-white/60" />
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-white/80 hover:text-white transition-colors flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload</span>
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 py-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-2 pl-12 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-4 top-2.5 h-5 w-5 text-white/60" />
            </div>
            <button className="w-full text-left text-white/80 py-2 flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload</span>
            </button>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-full font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

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
            Upload, explore, and download stunning wallpapers from creators around the world. 
            Join our community and share your visual masterpieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
              Start Exploring
            </button>
            <button className="border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all">
              Upload Your Art
            </button>
          </div>
        </div>
      </section>

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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Wallpaper Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={wallpaper.image}
                    alt={wallpaper.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleLike(wallpaper.id)}
                        className={`backdrop-blur-sm p-3 rounded-full transition-colors ${
                          likedImages.has(wallpaper.id)
                            ? 'bg-red-500/80 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${likedImages.has(wallpaper.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Resolution Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white font-medium">
                    {wallpaper.resolution}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={wallpaper.authorAvatar}
                      alt={wallpaper.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-lg">{wallpaper.title}</h3>
                      <p className="text-white/60 text-sm">by {wallpaper.author}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {wallpaper.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/10 text-white/80 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{wallpaper.likes.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{wallpaper.downloads.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{wallpaper.comments}</span>
                      </span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{wallpaper.uploadDate}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Sign In
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-white/60">
                Don't have an account?{' '}
                <button className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

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