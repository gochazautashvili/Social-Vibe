"use client";
import EmojiInput from "@/components/card/EmojiInput";
import UserMessage from "./UserMessage";
import {
  FormEventHandler,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Message, User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { sendMessage } from "@/actions/messages";
import useLastMessage from "@/hooks/useLastMessage";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { getConversation } from "@/data/messages";

export type UserWithMessages = Message & { user: User | null };

const Conversation = ({
  conversationId,
  messages: initialMessages,
}: {
  conversationId: string;
  messages: UserWithMessages[];
}) => {
  const { userId } = useAuth();
  const [message, setMessage] = useState("");
  const ScrollRef = useRef<HTMLDivElement>(null);
  const [isSending, startSending] = useTransition();
  const [isLestMessage, setIsLestMessage] = useState(false);
  const [messages, setMessages] = useState<UserWithMessages[]>(initialMessages);
  const { mutate } = useLastMessage(conversationId);

  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    startSending(() => {
      sendMessage(conversationId, message);
    });

    setMessage("");
    mutate();
  };

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    ScrollRef.current?.scrollIntoView();

    const handleMessage = (message: UserWithMessages) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [message, ...current];
      });

      ScrollRef.current?.scrollIntoView();
    };

    pusherClient.bind("message:new", handleMessage);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("message:new", handleMessage);
    };
  }, [conversationId]);

  useEffect(() => {
    if (inView) {
      const next = page + 1;
      getConversation(conversationId, next).then((res) => {
        if (res.message.length > 0) {
          setMessages((prev) => [...prev, ...res.message]);
          setPage(next);
        } else {
          setIsLestMessage(true);
        }
      });
    }
  }, [inView, page, conversationId]);

  return (
    <>
      <div className="flex flex-col-reverse gap-3 h-full overflow-y-auto md:h-[540px] scrollbar-thin pl-5 py-3 pr-2">
        <div className="w-1 h-1 mt-10" ref={ScrollRef}></div>

        {messages.map((message) => {
          const owner = message.userId === userId;

          return (
            <UserMessage key={message.id} message={message} owner={owner} />
          );
        })}
        {!isLestMessage && messages.length > 11 && (
          <div className="w-full flex justify-center mb-10" ref={ref}>
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        )}
        {isLestMessage && messages.length > 11 && (
          <p className="text-xs font-bold text-center">
            There is&apos;n more message!
          </p>
        )}
      </div>
      <div className="w-full h-[80px] sticky bottom-0 z-10 flex justify-center items-center px-5 border-t border-black dark:border-white/50">
        <EmojiInput
          isPending={isSending}
          text={message}
          setText={setMessage}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default Conversation;

const MessageSkeletonContainer = () => {
  return (
    <>
      <MessageSkeleton owner={true} />
      <MessageSkeleton owner={false} />
      <MessageSkeleton owner={false} />
      <MessageSkeleton owner={true} />
      <MessageSkeleton owner={true} />
      <MessageSkeleton owner={false} />
      <MessageSkeleton owner={true} />
      <MessageSkeleton owner={false} />
      <MessageSkeleton owner={true} />
    </>
  );
};

const MessageSkeleton = ({ owner }: { owner: boolean }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        owner ? "self-end flex-row-reverse" : "self-start"
      )}
    >
      <div className="w-11 h-11 rounded-full animate-pulse bg-slate-400"></div>
      <div
        className={cn(
          "px-4 py-1 rounded-lg max-w-[230px] flex flex-col",
          owner ? "bg-cyan-300 items-end" : "bg-gray-300"
        )}
      >
        <p className="text-xs mb-1 w-10 h-2 bg-slate-400 animate-pulse rounded"></p>
        <p className="bg-slate-400 animate-pulse w-20 h-5 rounded"></p>
      </div>
    </div>
  );
};
