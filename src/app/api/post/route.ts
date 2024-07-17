import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 404 });
    }

    const { image, description } = body;

    if (image == "" || description == "") {
      return new Response("image or description is missing", { status: 404 });
    }

    await db.post.create({
      data: {
        description,
        userId,
        image,
      },
    });

    revalidatePath("/", "layout");
    return Response.json(
      { success: true, message: "post created" },
      { status: 201, statusText: "ok" }
    );
  } catch (error) {
    return new Response("Error, internal server error", { status: 500 });
  }
}
