import MessageUserCard from "./MessageUserCard";
import { CommentSkeleton } from "../card/Controller";
import useUserFollowers from "@/hooks/useUserFollowers";

const Messages = () => {
  const { data: users, isLoading } = useUserFollowers();

  return (
    <div className="w-full mt-4 px-3">
      <h1 className="text-base font-semibold hidden lg:flex">Messages</h1>
      <div className="flex flex-col gap-4 mt-3">
        {users && !isLoading && users.length < 1 && (
          <>
            <h1 className="text-center mt-20 hidden md:flex">
              You have not friends, <br /> follow someone to message them
            </h1>
            <p className="md:hidden text-wrap">Chat is empty</p>
          </>
        )}
        {isLoading && <CommentSkeleton />}
        {users &&
          users?.map((user) => {
            return <MessageUserCard key={user.id} user={user.follower} />;
          })}
      </div>
    </div>
  );
};

export default Messages;
