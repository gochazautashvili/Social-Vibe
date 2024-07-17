import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/data/user";
import Link from "next/link";

const ProfileInfo = async ({ userId }: { userId: string }) => {
  const user = await getUserById(userId);

  return (
    <>
      <div className="w-fill flex sm:gap-14 sm:h-[40vh] sm:flex-row flex-col items-center sm:items-start gap-3">
        <Avatar className="w-32 h-32">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-5">
          <div className="flex Md:items-center gap-4 flex-col md:flex-row">
            <p className="text-2xl font-bold text-center">
              {user?.username || user?.first_name}
            </p>
            <Button variant="secondary">
              <Link href={`/settings/${user?.id}`}>Edit profile</Link>
            </Button>
            <Button variant="secondary">
              <Link href={`/activity/${user?.id}/user-posts`}>
                View archive
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-7">
            <p>{user?.postCount} posts</p>
            <p>{user?.followerCount} followers</p>
            <p>{user?.followingCount} following</p>
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.first_name}</p>
            <p className="mt-2 text-sm font-medium max-h-[240px] overflow-y-auto">
              {user?.bio}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-14 border-t border-primary/20 uppercase pt-3 text-sm font-semibold">
        <Link href={`/profile/${userId}`}>posts</Link>
        <Link href={`/profile/${userId}/saved`}>saved</Link>
      </div>
    </>
  );
};

export default ProfileInfo;
