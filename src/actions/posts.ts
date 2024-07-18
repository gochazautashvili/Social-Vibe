"use server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const DeletePostById = async (id: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const image = await db.post.delete({
      where: { id },
      select: {
        image: true,
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { postCount: { decrement: 1 } },
    });

    revalidatePath("/", "layout");
    return image.image;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const CreatePosts = async (image: string, description: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    if (image == "" || description == "") {
      throw new Error("image or description is missing");
    }

    await db.post.create({
      data: {
        description,
        userId,
        image,
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { postCount: { increment: 1 } },
    });

    revalidatePath("/", "layout");
    return { success: true, message: "post created" };
  } catch (error) {
    throw new Error("Error, internal server error");
  }
};

export const SavePost = async (postId: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    const existSaved = await db.saved.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (existSaved) {
      await db.saved.delete({
        where: { id: existSaved.id },
      });

      return false;
    } else {
      const save = await db.saved.create({
        data: {
          userId,
          postId,
        },
      });

      const isSaved = save.userId === userId;

      return isSaved;
    }
  } catch (error) {
    throw new Error("Error, internal server error");
  }
};
