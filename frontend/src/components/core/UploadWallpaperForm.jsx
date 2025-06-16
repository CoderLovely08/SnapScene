import Navbar from "@/components/core/Navbar";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Camera, X } from "lucide-react";
import { useState } from "react";
import { useUploadWallpaper } from "@/hooks/app/useWallpaper";

export default function UploadWallpaperForm({
  uploadForm,
  onSubmit,
  isUploadPending,
}) {
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const categories = ["Nature", "Urban", "Abstract", "Space", "Minimal"];
  const qualities = ["HD", "4K", "8K"];

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      uploadForm.setValue("image", file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    uploadForm.setValue("image", null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
      <Form {...uploadForm}>
        <form
          onSubmit={uploadForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Image Upload */}
          <FormField
            control={uploadForm.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Wallpaper Image *</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {!previewImage ? (
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                          dragActive
                            ? "border-purple-400 bg-purple-500/10"
                            : "border-white/30 hover:border-white/50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-full inline-block">
                            <Upload className="h-8 w-8 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium mb-1">
                              Drop your image here, or click to browse
                            </p>
                            <p className="text-white/60 text-sm">
                              Supports JPG, PNG, WebP (Max 10MB)
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-xl overflow-hidden bg-black/20">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-64 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <p className="text-white text-sm">
                            Image uploaded successfully
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={uploadForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a catchy title for your wallpaper"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={uploadForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your wallpaper... (optional)"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/60">
                  Optional: Describe the story behind your wallpaper
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category and Quality Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <FormField
              control={uploadForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Category *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="text-white hover:bg-white/10"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quality */}
            <FormField
              control={uploadForm.control}
              name="quality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Quality *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                      {qualities.map((quality) => (
                        <SelectItem
                          key={quality}
                          value={quality}
                          className="text-white hover:bg-white/10"
                        >
                          {quality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isUploadPending}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isUploadPending ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner spinnerColor="text-white" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Upload Wallpaper</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
