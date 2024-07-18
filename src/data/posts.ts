"use server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getPosts = async (page: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const posts = await db.post.findMany({
      include: {
        user: true,
      },
      take: 10,
      skip: 10 * page,
    });

    return posts;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getIsLikedPostByPostId = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const likes = await db.like.findMany({
      where: { postId },
      select: { userId: true },
    });

    const isLiked = likes.some((like) => like.userId === userId);

    return isLiked;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getIsSavedPostByPostId = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const saves = await db.saved.findMany({
      where: { postId },
      select: { userId: true },
    });

    const isSaved = saves.some((save) => save.userId === userId);

    revalidatePath("/");
    return isSaved;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getUserPostsByUserId = async (userId: string) => {
  try {
    const posts = await db.post.findMany({
      where: { userId },
    });

    return posts;
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};

export const getUserSavedByUserId = async (userId: string) => {
  try {
    const posts = await db.saved.findMany({
      where: { userId },
      include: { Post: true },
    });

    return posts;
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};

export const getUserLikedPostsByUserId = async (userId: string) => {
  try {
    const posts = await db.like.findMany({
      where: { userId },
      select: { Post: { select: { image: true, id: true } } },
    });

    return posts;
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};
