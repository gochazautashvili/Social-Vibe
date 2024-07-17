"use server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const CreateComment = async (postId: string, body: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");
  try {
    const comment = await db.comment.create({
      data: {
        postId,
        userId,
        body,
      },
      include: {
        user: true,
        like: true,
      },
    });

    return { success: true, message: "Comment was created", comment };
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};

export const DeleteCommentById = async (id: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    await db.comment.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    return { success: true, message: "Comment was deleted" };
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};
