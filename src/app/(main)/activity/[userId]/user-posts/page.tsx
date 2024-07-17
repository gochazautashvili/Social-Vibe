import { getUserPostsByUserId } from "@/data/posts";
import Card from "../components/Card";
import { getAllUser } from "@/data/user";

const UserPostPage = async ({ params }: { params: { userId: string } }) => {
  const posts = await getUserPostsByUserId(params.userId);

  if (posts.length < 1) {
    return (
      <h1 className="text-sm font-bold text-center mt-5">
        Empty, you have not any post!
      </h1>
    );
  }

  return (
    <>
      {posts.map((post) => {
        return <Card key={post.id} image={post.image} />;
      })}
    </>
  );
};

export default UserPostPage;

export async function generateStaticParams() {
  const users = await getAllUser();

  return users.map((user) => ({
    userId: user.id,
  }));
}
