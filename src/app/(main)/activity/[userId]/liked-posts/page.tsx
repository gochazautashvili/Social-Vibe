import { getUserLikedPostsByUserId } from "@/data/posts";
import Card from "../components/Card";
import { getAllUser } from "@/data/user";

const UserLikedPosts = async ({ params }: { params: { userId: string } }) => {
  const likedPosts = await getUserLikedPostsByUserId(params.userId);

  if (likedPosts.length < 1) {
    return (
      <h1 className="text-sm font-bold text-center mt-5">
        Empty, you have not liked any post!
      </h1>
    );
  }

  return (
    <>
      {likedPosts.map((liked) => {
        if (!liked.Post) return;

        return <Card key={liked.Post.id} image={liked.Post?.image} />;
      })}
    </>
  );
};

export default UserLikedPosts;

export async function generateStaticParams() {
  const users = await getAllUser();

  return users.map((user) => ({
    userId: user.id,
  }));
}
