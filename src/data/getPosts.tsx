"use server";

import Card from "@/components/card/Card";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

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
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts.map((post) => {
      return <Card key={post.id} post={post} />;
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
