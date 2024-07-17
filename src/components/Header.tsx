"use client";
import dynamic from "next/dynamic";
import { FaRegHeart } from "react-icons/fa6";
import { RiUserFollowFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Search = dynamic(() => import("./Search"), {
  ssr: false,
  loading: () => (
    <div className="w-[290px] h-10 animate-pulse bg-primary/20 rounded" />
  ),
});

const Header = () => {
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const message = pathname.includes("/messages");

  return (
    <header
      className={cn(
        "sticky top-0 md:hidden px-4 sm:px-5 bg-white/30 backdrop-blur-md z-20",
        message ? "hidden" : ""
      )}
    >
      <nav className="flex items-center justify-between h-[60px] gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-2xl font-bold cursor-pointer outline-none border-none ring-0">
            Instagram
            <RiArrowDropDownLine size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
              Following <RiUserFollowFill size={20} />{" "}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
              Favorites <FaRegStar size={20} />{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-5">
          <Search setSearch={setSearch} />
          <FaRegHeart size={25} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
