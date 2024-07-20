"use client";
import { Ellipsis, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
import { FiSend } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PostsWhitUser } from "@/app/(main)/page";
import { DeletePostById } from "@/actions/posts";
import { useState, useTransition } from "react";
import { toast } from "../ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import moment from "moment";
import axios from "axios";
import Link from "next/link";
import { Follow } from "@/actions/follow";
import { useRouter } from "next/navigation";

const PostOwner = ({
  post,
  currentUserFollowUser,
  userFollowCurrentUser,
}: {
  post: PostsWhitUser;
  currentUserFollowUser: boolean | undefined;
  userFollowCurrentUser: boolean | undefined;
}) => {
  const { userId } = useAuth();
  const [isDeleting, startDeleting] = useTransition();
  const [isFollowing, startFollowing] = useTransition();
  const [open, setOpen] = useState(false);
  const [openHover, setOpenHover] = useState(false);
  const router = useRouter();

  const handelImageDelete = async (image: string) => {
    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    try {
      await axios.post("/api/uploadthing/delete", { imageKey });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong, when deleting image",
      });
    }
  };

  const handleDeletePost = () => {
    startDeleting(async () => {
      try {
        const res = await DeletePostById(post.id);

        setOpen(false);

        toast({
          variant: "success",
          description: "Post deleted :)",
        });

        await handelImageDelete(res);
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Something went wrong :(",
        });
      }
    });
  };

  const handleFollowOrUnFollow = () => {
    startFollowing(() => {
      Follow(post.userId);
    });
  };

  const generateButtonContent = () => {
    if (isFollowing) return <Loader2 className="w-4 h-4 animate-spin" />;

    if (currentUserFollowUser) {
      return "Unfollow";
    }

    if (userFollowCurrentUser && !currentUserFollowUser) {
      return "Follow back";
    }

    if (!currentUserFollowUser && !userFollowCurrentUser) return "Follow";
  };

  const handleMessage = () => {
    if (userFollowCurrentUser && currentUserFollowUser) {
      router.push(`/messages/${post.user.conversationId}`);
    }
  };

  const handleHoverOpen = () => {
    setOpenHover((prev) => !prev);
  };

  return (
    <div
      className={cn("flex justify-between mb-4", isDeleting && "animate-pulse")}
    >
      <HoverCard openDelay={1} open={openHover} onOpenChange={setOpenHover}>
        <HoverCardTrigger
          onClick={handleHoverOpen}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{post.user.username}</h1>{" "}
          <span className="w-1 h-1 rounded-full bg-gray-400" />{" "}
          {moment(post.createdAt).fromNow()}
        </HoverCardTrigger>
        <HoverCardContent className="w-[400px]">
          <div className="flex gap-3 items-center">
            <Avatar className="w-14 h-14">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="font-semibold cursor-pointer">
                {post.user.username}
              </h1>
              <p className="text-xs">{post.user.first_name}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm font-semibold mt-5 px-10">
            <div className="flex flex-col items-center">
              <span>{post.user.postCount}</span>
              <span>posts</span>
            </div>
            <div className="flex flex-col  items-center">
              <span>{post.user.followerCount}</span>
              <span>followers</span>
            </div>
            <div className="flex flex-col  items-center">
              <span>{post.user.followingCount}</span>
              <span>followings</span>
            </div>
          </div>
          {post.userId !== userId && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button
                disabled={!userFollowCurrentUser && !currentUserFollowUser}
                onClick={handleMessage}
                className="flex gap-3 items-center w-full bg-blue-500 hover:bg-blue-600"
              >
                <FiSend size={23} /> Message
              </Button>
              <Button
                variant={currentUserFollowUser ? "destructive" : "default"}
                disabled={isFollowing}
                onClick={handleFollowOrUnFollow}
                className="w-full hover:bg-gray-500"
              >
                {generateButtonContent()}
              </Button>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="outline-none">
          <Ellipsis className="w-6 h-6" />
        </DialogTrigger>
        <DialogContent className="p-0 w-[90%] max-w-[350px]">
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Separator />
            {post.userId !== userId && (
              <Button
                onClick={handleFollowOrUnFollow}
                variant="ghost"
                disabled={isFollowing}
                className="py-3 w-full text-center cursor-pointer font-medium text-red-500"
              >
                {generateButtonContent()}
              </Button>
            )}
            <Separator />
            <p className="py-3 w-full text-center cursor-pointer font-medium">
              Add to favorites
            </p>
            <Separator />
            {userId === post.userId ? (
              <Button
                variant="ghost"
                disabled={isDeleting}
                onClick={handleDeletePost}
                className="py-3 w-full text-center cursor-pointer font-medium flex items-center justify-center"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-3" /> Post is
                    Deleting...
                  </>
                ) : (
                  "Delete post"
                )}
              </Button>
            ) : (
              <p className="py-3 w-full text-center cursor-pointer font-medium">
                Go to post
              </p>
            )}
            <Separator />
            <Link href={`/profile/${post.userId}`}>
              <p className="py-3 w-full text-center cursor-pointer font-medium">
                About this account
              </p>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostOwner;
