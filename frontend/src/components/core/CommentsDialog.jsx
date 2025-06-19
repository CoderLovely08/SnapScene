import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, getTimedifference } from "@/utils/app.utils";
import { useComments, useCreateComment } from "@/hooks/app/useWallpaper";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/auth.slice";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { MessageCircle, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const CommentsDialog = ({ wallpaperId, children }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector(selectUser);
  const { comments, isLoading } = useComments(wallpaperId, open);
  const { createComment, isCreating } = useCreateComment();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    createComment(
      {
        wallpaperId,
        content: comment.trim(),
      },
      {
        onSuccess: () => {
          setComment("");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
            View and share your thoughts on this wallpaper
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Comments List */}
          <ScrollArea className="flex-1 pr-4 max-h-[400px]">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : comments?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments?.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.user?.avatar} />
                      <AvatarFallback>
                        {getInitials(comment.user?.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm">
                            {comment.user?.fullName}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {getTimedifference(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Comment Input */}
          {user ? (
            <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="resize-none"
                    rows={2}
                    disabled={isCreating}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!comment.trim() || isCreating}
                  >
                    {isCreating ? (
                      <LoadingSpinner spinnerColor="text-white" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-sm text-muted-foreground">
                Please login to add comments
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;