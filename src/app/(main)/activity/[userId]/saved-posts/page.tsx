import { getUserSavedByUserId } from "@/data/posts";
import Card from "../components/Card";
import { getAllUser } from "@/data/user";

const UserSavedPosts = async ({ params }: { params: { userId: string } }) => {
  const savedPosts = await getUserSavedByUserId(params.userId);

  if (savedPosts.length < 1) {
    return (
      <h1 className="text-sm font-bold text-center mt-5">
        Empty, you have not saved any post!
      </h1>
    );
  }

  return (
    <>
      {savedPosts.map((saved) => {
        return <Card key={saved.Post.id} image={saved.Post?.image} />;
      })}
    </>
  );
};

export default UserSavedPosts;

export async function generateStaticParams() {
  const users = await getAllUser();

  return users.map((user) => ({
    userId: user.id,
  }));
}
