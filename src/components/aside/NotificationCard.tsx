"use client";
import { FollowRequest, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Follow } from "@/actions/follow";
import moment from "moment";
import useIsFollowedByCurrentUser from "@/hooks/useIsFollowedByCurrentUser";

type FollowRequestWithUser = FollowRequest & { sender: User | null };

const NotificationCard = ({
  notification,
}: {
  notification: FollowRequestWithUser;
}) => {
  const [isFollowing, startFollowing] = useTransition();
  const { data: isCurrentUserFollowUser, isLoading } =
    useIsFollowedByCurrentUser(notification.senderId!);

  const handelFollowOrUnFollow = () => {
    if (isLoading) return;

    startFollowing(() => {
      Follow(notification.senderId!);
    });
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex gap-2 items-center">
        <Avatar className="w-11 h-11">
          <AvatarImage src={notification?.sender?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-bold">{notification?.sender?.username}</p>
          <p className="text-xs text-gray-600/80 dark:text-white/40">
            this user followed you.{" "}
            {!isCurrentUserFollowUser
              ? "follow back for chat"
              : moment(notification.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <Button
        variant={isCurrentUserFollowUser ? "destructive" : "outline"}
        disabled={isFollowing || isLoading}
        onClick={handelFollowOrUnFollow}
        className={cn(
          "text-black text-xs py-0 px-2",
          isFollowing && "animate-pulse",
          isCurrentUserFollowUser && "text-white"
        )}
      >
        {isFollowing && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isFollowing && (isCurrentUserFollowUser ? "Unfollow" : "Follow back")}
      </Button>
    </div>
  );
};

export default NotificationCard;
