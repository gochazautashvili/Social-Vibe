"use client";
import { Dispatch, FormEventHandler, SetStateAction } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Input } from "../ui/input";
import { GrEmoji } from "react-icons/gr";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Loader2 } from "lucide-react";

const EmojiInput = ({
  text,
  setText,
  onSubmit,
  isPending,
}: {
  text: string;
  isPending?: boolean;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  setText: Dispatch<SetStateAction<string>>;
}) => {
  const handleEmoji = (emoji: any) => {
    const sym = emoji.unified.split("-");
    const codeArray = sym.map((el: string) => parseInt(el, 16));
    const emojiCharacter = String.fromCodePoint(...codeArray);
    setText((prevText) => prevText + emojiCharacter);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-3 w-full relative"
    >
      <div className="relative flex items-center justify-end w-full">
        <Input
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="w-full h-10 text-base pr-11"
          placeholder="text..."
          value={text}
        />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="absolute mr-3 cursor-pointer">
            <GrEmoji id="emojiButton" size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-none">
            <DropdownMenuItem className="bg-none">
              <Picker
                emojiSize={20}
                emojiButtonSize={28}
                maxFrequentRows={0}
                onEmojiSelect={handleEmoji}
                data={data}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button disabled={isPending} type="submit" variant="outline">
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-3" /> Sending...{" "}
          </>
        ) : (
          "Send"
        )}
      </Button>
    </form>
  );
};

export default EmojiInput;
