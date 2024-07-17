"use server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getIsUserFollowingCurrentUser = async (friendId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");
  try {
    const userFollowings = await db.user.findUnique({
      where: { id: userId },
      select: { follower: true },
    });

    if (!userFollowings) return false;

    const isUserFollowingCurrentUser = userFollowings?.follower.some(
      (follow) => follow.followerId === friendId
    );

    return isUserFollowingCurrentUser;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getIsCurrentUserFollowUser = async (friendId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const userFollowings = await db.user.findUnique({
      where: { id: friendId },
      select: { follower: true },
    });

    if (!userFollowings) return false;

    const isCurrentUserFollowUser = userFollowings?.follower.some(
      (follow) => follow.followerId === userId
    );

    return isCurrentUserFollowUser;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getNotifications = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const notifications = await db.followRequest.findMany({
      where: { userId },
      include: { sender: true },
    });

    return notifications;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
