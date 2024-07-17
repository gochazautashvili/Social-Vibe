"use client";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CommentsWhitUserAndLike } from "./Controller";
import moment from "moment";
import { useAuth } from "@clerk/nextjs";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { DeleteCommentById } from "@/actions/comments";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { LikeComment } from "@/actions/likes";

interface LikeInter {
  likeCount: number;
  isLiked: boolean;
}

const CommentCard = ({
  comment,
  setComments,
}: {
  comment: CommentsWhitUserAndLike;
  setComments: Dispatch<SetStateAction<CommentsWhitUserAndLike[]>>;
}) => {
  const { userId } = useAuth();
  const [isDeleting, startDeleting] = useTransition();
  const [isLiking, startLiking] = useTransition();
  const [likes, setLikes] = useState<LikeInter>({
    likeCount: comment.likeCount,
    isLiked: comment.like.some((like) => like.userId === userId),
  });

  const handleDeleteComment = (id: string) => {
    if (isDeleting) return;

    startDeleting(() => {
      DeleteCommentById(id)
        .then((res) => {
          setComments((prev) => prev.filter((comment) => comment.id !== id));
          toast({
            variant: "success",
            description: res.message,
          });
        })
        .catch((err: Error) => {
          toast({
            variant: "destructive",
            description: err.message,
          });
        });
    });
  };

  const handleLikeComment = async () => {
    if (isLiking) return;

    setLikes((state) => ({
      likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
      isLiked: !state.isLiked,
    }));

    try {
      startLiking(() => {
        LikeComment(comment.id);
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something went wrong :(",
      });
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        isDeleting && "animate-pulse"
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar className="w-9 h-9">
          <AvatarImage src={comment.user.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm">
          <div className="flex items-start gap-2">
            <span className="font-bold cursor-pointer">
              {comment.user.username}
            </span>
            <span>{comment.body}</span>
          </div>
          <div className="text-xs flex gap-3 cursor-pointer font-medium mt-1">
            {moment(comment.createdAt).fromNow()}{" "}
            <span
              onClick={handleLikeComment}
              className={cn(
                likes.isLiked && "font-semibold",
                isLiking && "animate-pulse duration-700"
              )}
            >
              {likes.likeCount} like
            </span>{" "}
            <span>reply</span>{" "}
            {userId === comment.user.id && (
              <span onClick={() => handleDeleteComment(comment.id)}>
                {isDeleting ? "deleting..." : "delete"}
              </span>
            )}
          </div>
        </div>
      </div>
      {likes.isLiked ? (
        <GoHeartFill
          onClick={handleLikeComment}
          className={cn(
            "cursor-pointer",
            isLiking && "animate-pulse duration-700"
          )}
          size={20}
        />
      ) : (
        <GoHeart
          onClick={handleLikeComment}
          className={cn(
            "cursor-pointer",
            isLiking && "animate-pulse duration-700"
          )}
          size={20}
        />
      )}
    </div>
  );
};

export default CommentCard;
