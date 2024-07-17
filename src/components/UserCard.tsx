"use client";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Follow } from "@/actions/follow";
import { Button } from "./ui/button";
import {
  getIsCurrentUserFollowUser,
  getIsUserFollowingCurrentUser,
} from "@/data/follow";

const UserCard = ({ user }: { user: User }) => {
  const [currentUserFollowUser, setCurrentUserFollowUser] = useState(false);
  const [userFollowCurrentUser, setUserFollowCurrentUser] = useState(false);
  const [isFollowing, startFollowing] = useTransition();

  useEffect(() => {
    getIsCurrentUserFollowUser(user.id).then((res) => {
      setCurrentUserFollowUser(res);
    });
  }, [user.id]);

  useEffect(() => {
    getIsUserFollowingCurrentUser(user.id).then((res) => {
      setUserFollowCurrentUser(res);
    });
  }, [user.id]);

  const handleFollowOrUnFollow = () => {
    if (isFollowing) return;

    startFollowing(() => {
      Follow(user.id);
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

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Avatar className="w-11 h-11 cursor-pointer">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold cursor-pointer">
            {user.username}
          </p>
          <p className="text-sm text-gray-600/80 dark:text-white/40">
            {user.first_name}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        disabled={isFollowing}
        onClick={handleFollowOrUnFollow}
        className="text-cyan-700 cursor-pointer text-sm font-semibold"
      >
        {generateButtonContent()}
      </Button>
    </div>
  );
};

export default UserCard;
