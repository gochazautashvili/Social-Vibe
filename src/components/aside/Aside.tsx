"use client";
import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { RiAddBoxLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BsFillSendFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiSettings5Line } from "react-icons/ri";
import { MdOutlineBrokenImage } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import AsideSearch from "./AsideSearch";
import Notifications from "./Notifications";
import Messages from "./Messages";
import { SignOutButton, useUser } from "@clerk/nextjs";
import CreatePost from "./CreatePost";

const Aside = () => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState(false);
  const [notification, setNotification] = useState(false);
  const [open, setOpen] = useState(false);

  const message = pathname.includes("/messages");
  const home = pathname === "/" && !search && !message && !notification;

  const handelSetHome = () => {
    router.push("/");
    setNotification(false);
    setSearch(false);
  };

  const handleSetSearch = () => {
    setSearch(!search);
    setNotification(false);
  };

  const handleSetMessage = () => {
    if (message) {
      router.push(pathname);
    } else {
      router.push("/messages");
    }

    setSearch(false);
    setNotification(false);
  };

  const handleSetNotification = () => {
    setSearch(false);
    setNotification(!notification);
  };

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      <aside className="h-screen md:flex flex-col items-start justify-between py-8 px-7 border-r border-primary/20 hidden sticky top-0 z-30 bg-white dark:bg-black">
        <div onClick={() => router.push("/")}>
          <h1
            className={cn(
              "hidden lg:flex  text-2xl font-bold cursor-pointer",
              search || message || notification ? "lg:hidden" : ""
            )}
          >
            Instagram
          </h1>
          <FaInstagram
            size={30}
            className={cn(
              "cursor-pointer lg:hidden",
              search || message || notification ? "lg:flex" : ""
            )}
          />
        </div>
        <div className="flex flex-col items-start gap-10 my-14">
          <div
            onClick={handelSetHome}
            className="flex items-center gap-3 cursor-pointer"
          >
            {home ? <GoHomeFill size={30} /> : <GoHome size={30} />}
            <p
              className={cn(
                "hidden lg:flex",
                search || message || notification ? "lg:hidden" : ""
              )}
            >
              Home
            </p>
          </div>
          <Sheet modal={false} onOpenChange={handleSetSearch}>
            <SheetTrigger className="flex items-center gap-3 cursor-pointer">
              <FiSearch strokeWidth={search ? 3 : 1} size={30} />
              <p
                className={cn(
                  "hidden lg:flex",
                  search || message || notification ? "lg:hidden" : ""
                )}
              >
                Search
              </p>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="left-[80px] bg-none border-l border-primary/20 shadow-sm z-20 py-6 px-8"
            >
              <SheetHeader>
                <SheetTitle className="text-xl">Search</SheetTitle>
                <SheetDescription className="divide-none"></SheetDescription>
              </SheetHeader>
              <AsideSearch />
            </SheetContent>
          </Sheet>
          <div
            onClick={handleSetMessage}
            className="flex items-center gap-3 cursor-pointer"
          >
            {message ? <BsFillSendFill size={30} /> : <FiSend size={30} />}
            <p
              className={cn(
                "hidden lg:flex",
                search || message || notification ? "lg:hidden" : ""
              )}
            >
              Messages
            </p>
          </div>
          <Sheet modal={false} onOpenChange={handleSetNotification}>
            <SheetTrigger className="flex items-center gap-3 cursor-pointer">
              {notification ? (
                <GoHeartFill size={30} />
              ) : (
                <FaRegHeart size={30} />
              )}

              <p
                className={cn(
                  "hidden lg:flex",
                  search || message || notification ? "lg:hidden" : ""
                )}
              >
                Notifications
              </p>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="ml-[80px] bg-none border-l border-primary/20 shadow-sm z-20"
            >
              <SheetHeader>
                <SheetTitle className="text-2xl font-semibold">
                  Notifications
                </SheetTitle>
                <SheetDescription className="text-black text-sm font-bold">
                  Follow requests
                </SheetDescription>
              </SheetHeader>
              <Notifications />
            </SheetContent>
          </Sheet>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center gap-3 cursor-pointer">
              <RiAddBoxLine size={34} />
              <p
                className={cn(
                  "hidden lg:flex",
                  search || message || notification ? "lg:hidden" : ""
                )}
              >
                Create
              </p>
            </DialogTrigger>
            <DialogContent className="w-[95%]">
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
          <div
            onClick={() => router.push(`/profile/${user?.id}`)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p
              className={cn(
                "hidden lg:flex",
                search || message || notification ? "lg:hidden" : ""
              )}
            >
              Profile
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 ring-0 outline-none">
            <RxHamburgerMenu size={30} />
            <p
              className={cn(
                "hidden lg:flex",
                search || message || notification ? "lg:hidden" : ""
              )}
            >
              More
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-5 w-[260px] shadow-md">
            <DropdownMenuItem
              onClick={() => router.push(`/settings/${user?.id}`)}
              className="flex items-center gap-3 cursor-pointer py-4 px-2"
            >
              <RiSettings5Line size={22} /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/activity/${user?.id}/user-posts`)}
              className="flex items-center gap-3 cursor-pointer py-4 px-2"
            >
              <MdOutlineBrokenImage size={22} /> Your activity
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/profile/${user?.id}/saved`)}
              className="flex items-center gap-3 cursor-pointer py-4 px-2"
            >
              <MdOutlineSaveAlt size={22} /> Saved
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-0">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 ring-0 outline-none w-full h-full py-4 px-2">
                  <IoSunnyOutline size={22} /> Switch appearance
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-5 w-[260px] shadow-md">
                  <DropdownMenuLabel className="flex justify-between items-center cursor-pointer">
                    <div className="flex gap-1 items-center">
                      <ChevronLeft className="opacity-60 w-4 h-4" /> Switch
                      appearance
                    </div>
                    <IoSunnyOutline size={22} />
                  </DropdownMenuLabel>
                  <label
                    htmlFor="Dark mode"
                    className="flex items-center justify-between gap-3 cursor-pointer py-4 px-2 w-full h-full"
                  >
                    Dark mode
                    <Switch
                      onCheckedChange={handleThemeChange}
                      checked={theme === "dark"}
                      id="Dark mode"
                      className="h-4 w-7"
                    />
                  </label>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="h-2" />
            <SignOutButton>
              <DropdownMenuItem className="cursor-pointer py-4 px-2">
                Log out
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>
      {message && (
        <div className="sticky top-0 h-screen px-3 lg:px-5 py-6 border-r border-primary/20 dark:border-white/50 shadow-lg hidden md:block">
          <div>
            <h1 className="text-2xl font-semibold hidden lg:flex">
              gocha_zautashvili
            </h1>
            <h1 className="text-2xl font-semibold text-center lg:hidden">
              VIBE
            </h1>
          </div>
          <Messages />
        </div>
      )}
    </>
  );
};

export default Aside;
