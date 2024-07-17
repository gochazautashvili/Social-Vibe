"use server";

import db from "@/lib/db";

export const getCommentsByPostId = async (id: string, page: number) => {
  const posts = await db.comment.findMany({
    where: {
      postId: id,
    },
    include: {
      user: true,
      like: true,
    },
    take: 8,
    skip: 8 * page,
    orderBy: { createdAt: "desc" },
  });

  return posts;
};
