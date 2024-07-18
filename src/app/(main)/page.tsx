import { CommentSkeleton } from "@/components/card/Controller";
import Posts from "@/components/Posts";
import { getPosts } from "@/data/posts";
import { getUsers } from "@/data/user";
import { currentUser } from "@clerk/nextjs/server";
import { Post, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import dynamic from "next/dynamic";
const UserCard = dynamic(() => import("@/components/UserCard"), {
  ssr: false,
  loading: () => <CommentSkeleton />,
});

export type PostsWhitUser = Post & { user: User };

const Home = async () => {
  const user = await currentUser();
  const posts: PostsWhitUser[] = await getPosts(0);
  const users: User[] = await getUsers();

  return (
    <div className="flex gap-20 py-8 px-5">
      <Posts posts={posts} />
      <aside className="w-[350px] h-[360px] hidden xl:flex flex-col flex-[2]">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar className="w-11 h-11 cursor-pointer">
              <AvatarImage className="rounded-full" src={user?.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-semibold cursor-pointer">
                {user?.username}
              </p>
              <p className="text-sm text-gray-600/80 dark:text-white/40">
                {user?.firstName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 my-4">
          <p className="text-gray-500/90 font-medium text-sm">
            Suggested for you
          </p>
          <p className="text-xs font-semibold cursor-pointer">See All</p>
        </div>
        <div className="flex flex-col gap-4">
          {users.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })}
        </div>
      </aside>
    </div>
  );
};

export default Home;
