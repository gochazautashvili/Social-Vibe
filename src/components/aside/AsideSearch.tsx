"use client";
import { useEffect, useState } from "react";
import Search from "../Search";
import UserCard from "../UserCard";
import { Separator } from "../ui/separator";
import { searchUser } from "@/data/user";
import { User } from "@prisma/client";
import { toast } from "../ui/use-toast";
import { CommentSkeleton } from "../card/Controller";

const AsideSearch = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setUsers([]);
      setLoading(true);
      searchUser(search)
        .then((res: User[]) => {
          setUsers(res);
          setLoading(false);
        })
        .catch((err: Error) => {
          toast({
            variant: "destructive",
            description: err.message,
          });
        });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <>
      <Search setSearch={setSearch} />
      <Separator className="my-5" />
      <div className="pb-4 h-full">
        <h1 className="font-medium text-base">Recent</h1>
        <div className="h-full w-full overflow-y-auto flex flex-col mt-5 gap-6 pr-3 scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-400">
          {users.length < 1 && !loading ? (
            <p className="mb-52 text-sm font-medium w-full h-full flex items-center justify-center">
              No recent searches.
            </p>
          ) : (
            <>
              {users.map((user) => {
                return <UserCard key={user.id} user={user} />;
              })}
            </>
          )}
          {loading && <CommentSkeleton />}
        </div>
      </div>
    </>
  );
};

export default AsideSearch;
