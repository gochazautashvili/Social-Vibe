"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useLastMessage from "@/hooks/useLastMessage";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { createConversation } from "@/actions/messages";

const MessageUserCard = ({ user }: { user: User | null }) => {
  const { data: lastMessage, isLoading } = useLastMessage(user?.id);
  const router = useRouter();

  const handleMessage = () => {
    createConversation(user?.id!).then((res) => {
      router.push(`/messages/${res}`);
    });
  };

  const formateText = (text: string) => {
    if (text.length > 14) {
      return text.slice(0, 13) + "...";
    }

    return text;
  };

  return (
    <div
      onClick={handleMessage}
      className="flex justify-between items-center cursor-pointer"
    >
      <div className="flex gap-2 items-center">
        <Avatar className="w-11 h-11">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-col md:hidden lg:flex">
          <p className="text-[16px] font-semibold">{user?.username}</p>
          <p
            className={cn(
              "text-xs dark:text-white/40",
              lastMessage?.seen ? "text-gray-600/80" : "text-black font-bold"
            )}
          >
            {isLoading && "loading..."}
            {!lastMessage && !isLoading && "there is't new message"}
            {!isLoading && !!lastMessage && formateText(lastMessage?.body)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageUserCard;
