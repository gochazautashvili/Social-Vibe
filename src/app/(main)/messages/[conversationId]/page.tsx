import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Conversation from "../components/Conversation";
import { getConversationUser } from "@/data/user";
import db from "@/lib/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCurrentUserFollowers } from "@/actions/follow";
import MessageUserCard from "@/components/aside/MessageUserCard";
import { getConversation } from "@/data/messages";

const MessageSingleUserPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const user = await getConversationUser(params.conversationId);
  const followers = await getCurrentUserFollowers();
  const conversations = await getConversation(params.conversationId, 0);

  return (
    <div className="h-screen-minus-80">
      <div className="w-full h-[100px] sticky top-0 z-10 flex items-center justify-between border-b border-gray-500 px-4 bg-white dark:bg-black">
        <div className="items-center gap-3 hidden md:flex">
          <Avatar className="w-11 h-11">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold">
            {user?.username || user?.first_name}
          </h1>
        </div>
        <div className="md:hidden">
          <Dialog>
            <DialogTrigger className="flex items-center gap-3 cursor-pointer">
              <Avatar className="w-11 h-11">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-semibold">
                {user?.username || user?.first_name}
              </h1>
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
      <Conversation
        conversationId={params.conversationId}
        messages={conversations.message}
      />
    </div>
  );
};

export default MessageSingleUserPage;

export async function generateStaticParams() {
  const conversations = await db.conversation.findMany();

  return conversations.map((conversation) => ({
    conversationId: conversation.id,
  }));
}
