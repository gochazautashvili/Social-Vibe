"use server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getConversation = async (conversationId: string, page: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized :(");

  try {
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: {
        message: {
          include: {
            user: true,
          },
          take: 12,
          skip: 12 * page,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!conversation) throw new Error("Something went wrong with this friend");

    if (conversation.message.length > 0) {
      if (
        userId !== conversation.message[conversation.message.length - 1].userId
      ) {
        await db.message.updateMany({
          where: { seen: false, conversationId: conversation.id },
          data: { seen: true },
        });
      }
    }

    return conversation;
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};

export const getUserConversation = async (friendId: string | undefined) => {
  const { userId } = auth();

  if (!userId || !friendId) throw new Error("Unauthorized :(");

  try {
    const conversation = await db.conversation.findFirst({
      where: { userIds: { hasSome: [userId, friendId] } },
    });

    return conversation;
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};

export const getLastMessage = async (friendId: string | undefined) => {
  const { userId } = auth();

  if (!userId || !friendId) throw new Error("Unauthorized :(");

  try {
    const conversation = await db.conversation.findFirst({
      where: { userIds: { hasSome: [userId, friendId] } },
      include: { message: true },
    });

    if (!conversation) {
      throw new Error("This user is't follow you or you don't follow him/she");
    }

    if (conversation.message.length < 1) {
      return null;
    }

    const lastMessage = await db.message.findUnique({
      where: {
        id: conversation.message[conversation.message.length - 1].id,
        userId: {
          not: userId,
        },
      },
    });

    return lastMessage;
  } catch (error) {
    throw new Error("Something went wrong :(");
  }
};
