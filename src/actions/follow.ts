"use server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const Follow = async (friendId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const existingFollow = await db.follower.findFirst({
      where: {
        followerId: userId,
        followingId: friendId,
      },
    });

    if (existingFollow) {
      await db.follower.delete({
        where: { id: existingFollow?.id },
      });

      await db.user.update({
        where: { id: userId },
        data: {
          followingCount: { decrement: 1 },
        },
      });

      await db.user.update({
        where: { id: friendId },
        data: {
          followerCount: { decrement: 1 },
        },
      });

      const existingFollowRequest = await db.followRequest.findFirst({
        where: {
          senderId: userId,
          userId: friendId,
        },
      });

      if (existingFollowRequest) {
        await db.followRequest.delete({
          where: { id: existingFollowRequest.id },
        });
      }
    } else {
      await db.follower.create({
        data: {
          followerId: userId,
          followingId: friendId,
        },
      });

      await db.user.update({
        where: { id: userId },
        data: {
          followingCount: { increment: 1 },
        },
      });

      await db.user.update({
        where: { id: friendId },
        data: {
          followerCount: { increment: 1 },
        },
      });

      await db.followRequest.create({
        data: {
          senderId: userId,
          userId: friendId,
        },
      });
    }

    revalidatePath("/");
    return { success: true, message: "Follow successfully :)" };
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};

export const getCurrentUserFollowers = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const followers = await db.follower.findMany({
      where: { followingId: userId },
      include: {
        follower: true,
      },
    });

    revalidatePath("/");
    return followers;
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};
