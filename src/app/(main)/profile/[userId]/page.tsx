import { getUserPostsByUserId } from "@/data/posts";
import Card from "./components/Card";
import { getAllUser } from "@/data/user";

interface Props {
  params: {
    userId: string;
  };
}

const ProfilePage = async ({ params }: Props) => {
  const posts = await getUserPostsByUserId(params.userId);

  return (
    <div className="w-full min-h-[40vh] flex items-center justify-center">
      {posts.length < 1 ? (
        <p>you have not posts yet.</p>
      ) : (
        <div className="flex justify-center gap-6 flex-wrap w-full px-5">
          {posts.map((post) => {
            return (
              <Card
                key={post.id}
                image={post.image}
                description={post.description}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

export async function generateStaticParams() {
  const users = await getAllUser();

  return users.map((user) => ({
    userId: user.id,
  }));
}
