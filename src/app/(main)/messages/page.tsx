import { getCurrentUserFollowers } from "@/actions/follow";
import MessageUserCard from "@/components/aside/MessageUserCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MessagesPage = async () => {
  const followers = await getCurrentUserFollowers();

  return (
    <div className="flex justify-center mt-[300px]">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-3xl font-bold">Your messages</h1>
        <p className="text-xl font-semibold hidden md:flex">
          Send a message to start a chat.
        </p>
        <div className="md:hidden">
          <Dialog>
            <DialogTrigger className="text-xl font-semibold text-blue-400 underline cursor-pointer">
              Send a message to start a chat.
            </DialogTrigger>
            <DialogContent className="md:hidden w-[95%]">
              <DialogHeader>
                <DialogTitle>Your friends</DialogTitle>
                <DialogDescription>Chat with your friends</DialogDescription>
              </DialogHeader>
              <div>
                {followers.map((user) => {
                  return <MessageUserCard key={user.id} user={user.follower} />;
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
