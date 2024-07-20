"use client";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import PostOwner from "./PostOwner";
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CommentCard from "./CommentCard";
import { Separator } from "../ui/separator";
import EmojiInput from "./EmojiInput";
import { PostsWhitUser } from "@/app/(main)/page";
import { Comment, Like, User } from "@prisma/client";
import moment from "moment";
import { getCommentsByPostId } from "@/data/comments";
import { CreateComment } from "@/actions/comments";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { LikePost } from "@/actions/likes";
import { SavePost } from "@/actions/posts";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import useIsLikedPostByPostId from "@/hooks/useIsLikedPostByPostId";
import useIsSavedPostByPostId from "@/hooks/useIsSavedPostByPostId";

export type CommentsWhitUserAndLike = Comment & { user: User } & {
  like: Like[];
};

const Controller = ({
  post,
  isLiked,
  isSaved,
  currentUserFollowUser,
  userFollowCurrentUser,
}: {
  post: PostsWhitUser;
  isLiked: boolean;
  isSaved: boolean;
  currentUserFollowUser: boolean;
  userFollowCurrentUser: boolean;
}) => {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<CommentsWhitUserAndLike[]>([]);
  const [comment, setComment] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [page, setPage] = useState(-1);
  const [lestComment, setLestComment] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      const next = page + 1;
      const res = await getCommentsByPostId(post.id, next);

      if (res.length > 0) {
        setComments((prev) => [...prev, ...res]);
        setPage(next);
      } else {
        setLestComment(true);
      }
    };

    if (inView) {
      getComments();
    }
  }, [inView, post.id, page]);

  const onSubmit: FormEventHandler<HTMLFormElement> | undefined = (e) => {
    e.preventDefault();

    setIsPending(true);
    CreateComment(post.id, comment)
      .then((res) => {
        setIsPending(false);
        setComments([...comments, res.comment]);
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

    setComment("");
  };

  return (
    <>
      <TopController
        setOpen={setOpen}
        isSaved={isSaved}
        isLiked={isLiked}
        postId={post.id}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="text-sm cursor-pointer font-semibold text-gray-400 my-2 hidden"></DialogTrigger>
        <DialogContent className="p-0 w-[95%] max-w-[1200px] overflow-hidden z-50">
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="lg:flex h-[85vh]">
            <div className="hidden lg:flex flex-[1.4] relative items-center">
              <Image
                fill
                src={post.image}
                alt={post.description}
                className="object-contain bg-black"
              />
            </div>
            <div className="flex-[1] p-4 h-full relative">
              <PostOwner
                post={post}
                currentUserFollowUser={currentUserFollowUser}
                userFollowCurrentUser={userFollowCurrentUser}
              />
              <Separator />
              <div className="flex max-h-[420px] sm:max-h-[360px] flex-col gap-6 pb-4 mt-6 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-900/20 scrollbar-track-white">
                {comments.length > 0 &&
                  comments.map((comment) => {
                    return (
                      <CommentCard
                        key={comment.id}
                        comment={comment}
                        setComments={setComments}
                      />
                    );
                  })}
                {isPending && <Skeleton />}
                {comments.length < 1 && (
                  <div className="w-full h-full flex items-center justify-center">
                    there is no comments.
                  </div>
                )}
                {lestComment && (
                  <p className="text-xs font-bold text-center">
                    There is&apos;n more comment!
                  </p>
                )}
                {!lestComment && (
                  <div className="w-full flex justify-center" ref={ref}>
                    <Loader2 className="w-10 h-10 animate-spin" />
                  </div>
                )}
              </div>
              <div className="my-3 sticky bottom-[6px] top-full">
                <Separator />
                <div>
                  <TopController
                    setOpen={setOpen}
                    postId={post.id}
                    isLiked={isLiked}
                    isSaved={isSaved}
                  />
                  <p className="text-xs font-semibold text-gray-500">
                    {moment(post.createdAt).fromNow()}
                  </p>
                </div>
                <EmojiInput
                  text={comment}
                  onSubmit={onSubmit}
                  setText={setComment}
                  isPending={isPending}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Controller;

const TopController = ({
  setOpen,
  postId,
  isLiked,
  isSaved,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
  isLiked: boolean;
  isSaved: boolean;
}) => {
  const { mutate: mutateLike, data: like } = useIsLikedPostByPostId(postId);
  const { mutate: mutateSave, data: saved } = useIsSavedPostByPostId(postId);

  const handleLikePost = () => {
    mutateLike(LikePost(postId), {
      optimisticData: !like,
      rollbackOnError: true,
    });
  };

  const handleSavePost = () => {
    mutateSave(SavePost(postId), {
      optimisticData: !saved,
      rollbackOnError: true,
    });
  };

  return (
    <div className="flex items-center justify-between mt-3">
      <div className="flex gap-4 items-center">
        <Button onClick={handleLikePost} variant="ghost" type="button">
          {isLiked ? (
            <GoHeartFill fill="red" className="cursor-pointer" size={28} />
          ) : (
            <GoHeart className="cursor-pointer" size={28} />
          )}
        </Button>
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          <svg
            aria-label="Comment"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Comment</title>
            <path
              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </div>
      </div>
      <div onClick={handleSavePost} className="cursor-pointer">
        <svg
          aria-label="Save"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Save</title>
          <polygon
            fill={isSaved ? "blue" : "none"}
            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          ></polygon>
        </svg>
      </div>
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 pb-4 mt-6">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export const Skeleton = () => {
  return (
    <div className="flex items-center justify-between sm:w-auto sm:h-auto w-10 h-10 rounded-full sm:rounded-none bg-slate-400 sm:bg-transparent">
      <div className="sm:flex items-center gap-4 hidden">
        <div className="w-9 h-9 rounded-full animate-pulse bg-gray-400"></div>
        <div className="flex flex-col">
          <div className="w-[200px] sm:w-[300px] h-3 animate-pulse bg-gray-400"></div>
          <div className="w-[100px] bg-gray-400 h-2 mt-1"></div>
        </div>
      </div>
      <div className="sm:flex hidden w-4 h-4 bg-gray-400 rounded-full animate-ping"></div>
    </div>
  );
};
