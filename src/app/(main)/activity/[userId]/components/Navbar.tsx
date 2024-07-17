"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ userId }: { userId: string }) => {
  const pathname = usePathname();

  const liked = pathname.includes("liked-posts");
  const saved = pathname.includes("saved-posts");
  const user = pathname.includes("user-posts");

  return (
    <nav className="flex items-center justify-center w-full border-b border-gray-500 py-3 sticky top-0 bg-blue-400/50 backdrop-blur-md">
      <ul className="flex gap-10 items-center text-base">
        <li
          className={
            liked
              ? "text-green-600 font-bold"
              : "text-black font-semibold dark:text-white"
          }
        >
          <Link href={`/activity/${userId}/liked-posts`}>liked posts</Link>
        </li>
        <li
          className={
            saved
              ? "text-green-600 font-bold"
              : "text-black font-semibold dark:text-white"
          }
        >
          <Link href={`/activity/${userId}/saved-posts`}>saved posts</Link>
        </li>
        <li
          className={
            user
              ? "text-green-600 font-bold"
              : "text-black font-semibold dark:text-white"
          }
        >
          <Link href={`/activity/${userId}/user-posts`}>your posts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
