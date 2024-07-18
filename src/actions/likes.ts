"use server";

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const LikeComment = async (commentId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const existingLike = await db.like.findFirst({
      where: {
        userId,
        commentId,
      },
      select: { id: true },
    });

    if (existingLike) {
      await db.comment.update({
        where: { id: commentId },
        data: {
          likeCount: {
            decrement: 1,
          },
          like: {
            delete: {
              id: existingLike?.id,
            },
          },
        },
      });
    } else {
      await db.comment.update({
        where: { id: commentId },
        data: {
          likeCount: {
            increment: 1,
          },
          like: {
            create: {
              userId,
            },
          },
        },
      });
    }

    revalidatePath("/");
    return { success: true, message: "success" };
  } catch (error) {
    if (!userId)
      throw new Error("Something went wrong :(, while comment liking");
  }
};

export const LikePost = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const existingLike = await db.like.findFirst({
      where: {
        userId,
        postId,
      },
      select: { id: true },
    });

    if (existingLike) {
      const post = await db.post.update({
        where: { id: postId },
        data: {
          likeCount: {
            decrement: 1,
          },
          like: {
            delete: {
              id: existingLike?.id,
            },
          },
        },
        select: { like: true },
      });

      const isLiked = post.like.some((like) => like.userId === userId);

      return isLiked;
    } else {
      const post = await db.post.update({
        where: { id: postId },
        data: {
          likeCount: {
            increment: 1,
          },
          like: {
            create: {
              userId,
            },
          },
        },
        select: { like: true },
      });

      const isLiked = post.like.some((like) => like.userId === userId);

      return isLiked;
    }
  } catch (error) {
    throw new Error("Something went wrong :(, while post liking");
  }
};
