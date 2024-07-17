"use server";
import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const sendMessage = async (conversationId: string, body: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized :)");
  try {
    const message = await db.message.create({
      data: {
        conversationId,
        userId,
        body,
      },
      include: {
        user: true,
      },
    });

    await pusherServer.trigger(conversationId, "message:new", message);

    revalidatePath(`/messages/${conversationId}`);
    return { success: true, message: "Message send successfully :)" };
  } catch (error) {
    throw new Error("Something went wrong :)");
  }
};

export const createConversation = async (friendId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized :)");

  try {
    const existingConversation = await db.conversation.findFirst({
      where: {
        userIds: { hasSome: [userId, friendId] },
      },
      select: { id: true },
    });

    if (!existingConversation) {
      const conversation = await db.conversation.create({
        data: {
          userIds: [userId, friendId],
          users: {
            connect: [
              {
                id: userId,
              },
              {
                id: friendId,
              },
            ],
          },
        },
        select: { id: true },
      });

      return conversation.id;
    }

    return existingConversation.id;
  } catch (error) {
    throw new Error("Something went wrong :)");
  }
};
