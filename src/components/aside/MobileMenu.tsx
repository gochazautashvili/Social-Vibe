"use client";
import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { RiAddBoxLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BsFillSendFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import CreatePost from "./CreatePost";
import { useState } from "react";

const MobileMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const message = pathname.includes("/messages");
  const explore = pathname.includes("/explore");
  const home = pathname === "/";

  return (
    <div className="md:hidden sticky bottom-0 border-t border-primary/20 px-10 h-12 w-full bg-white/50 backdrop-blur-lg flex justify-center items-center gap-10 sm:gap-20 z-50">
      <div onClick={() => router.push("/")}>
        {home ? (
          <GoHomeFill size={30} className="cursor-pointer" />
        ) : (
          <GoHome size={30} className="cursor-pointer" />
        )}
      </div>
      <div onClick={() => router.push("/explore")}>
        {explore ? (
          <MdExplore size={30} className="cursor-pointer" />
        ) : (
          <MdOutlineExplore size={30} className="cursor-pointer" />
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex items-center gap-3 cursor-pointer">
          <RiAddBoxLine size={30} className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-base">
              Create new post!
            </DialogTitle>
            <Separator className="mt-3" />
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CreatePost setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      <div onClick={() => router.push("/messages")}>
        {message ? (
          <BsFillSendFill size={30} className="cursor-pointer" />
        ) : (
          <FiSend size={30} className="cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
