import { getUserSavedByUserId } from "@/data/posts";
import Card from "../components/Card";
import { getAllUser } from "@/data/user";

interface Props {
  params: {
    userId: string;
  };
}

const ProfileSavedPage = async ({ params }: Props) => {
  const posts = await getUserSavedByUserId(params.userId);

  return (
    <div className="w-full min-h-[40vh] flex items-center justify-center max-w-[1000px]">
      {posts.length < 1 ? (
        <p>you have not saved posts yet.</p>
      ) : (
        <div className="flex justify-center gap-5 sm:gap-10 flex-wrap basis-[200px]">
          {posts.map((post) => {
            return (
              <Card
                key={post.id}
                image={post.Post.image}
                description={post.Post.description}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileSavedPage;

export async function generateStaticParams() {
  const users = await getAllUser();

  return users.map((user) => ({
    userId: user.id,
  }));
}
