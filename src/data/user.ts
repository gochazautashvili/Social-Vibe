"use server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const searchUser = async (name: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const users = db.user.findMany({
      where: {
        id: { not: userId },
        username: {
          search: name,
        },
      },
    });

    return users;
  } catch (error) {
    throw new Error("Something went wring :(");
  }
};

export const getUsers = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const users = db.user.findMany({
      where: {
        id: { not: userId },
      },
    });

    return users;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getConversationUser = async (id: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const conversation = await db.conversation.findUnique({
      where: { id },
      select: { userIds: true },
    });

    const friendId = conversation?.userIds.filter((id) => id !== userId)[0];

    const user = await db.user.findUnique({
      where: { id: friendId },
    });

    return user;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getAllUser = async () => {
  try {
    const users = await db.user.findMany();

    return users;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
