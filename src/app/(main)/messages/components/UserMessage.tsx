import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserWithMessages } from "./Conversation";
import moment from "moment";

const UserMessage = ({
  owner,
  message,
}: {
  owner: boolean;
  message: UserWithMessages;
}) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        owner ? "self-end flex-row-reverse" : "self-start"
      )}
    >
      <Avatar className="w-11 h-11">
        <AvatarImage src={message.user?.avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "px-4 py-1 rounded-lg max-w-[230px] flex flex-col text-black",
          owner ? "bg-cyan-300 items-end" : "bg-gray-300"
        )}
      >
        <p className="text-xs mb-1">
          {moment(new Date(message.createdAt)).fromNow()}
        </p>
        <p>{message.body}</p>
      </div>
    </div>
  );
};

export default UserMessage;
