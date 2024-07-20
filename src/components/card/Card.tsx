"use client";
import Image from "next/image";
import PostOwner from "./PostOwner";
import { PostsWhitUser } from "@/app/(main)/page";
import dynamic from "next/dynamic";
import useIsLikedPostByPostId from "@/hooks/useIsLikedPostByPostId";
import useIsSavedPostByPostId from "@/hooks/useIsSavedPostByPostId";
import useIsFollowedByCurrentUser from "@/hooks/useIsFollowedByCurrentUser";
import useIsFollowingCurrentUser from "@/hooks/useIsFollowingCurrentUser";
import usePostComments from "@/hooks/usePostComments";
import { CommentsWhitUserAndLike } from "./Controller";

const Controller = dynamic(() => import("./Controller"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-12 bg-primary/40 animate-pulse mt-3 rounded-lg"></div>
  ),
});

const Card = ({ post }: { post: PostsWhitUser }) => {
  const { data: isLiked } = useIsLikedPostByPostId(post.id);
  const { data: isSaved } = useIsSavedPostByPostId(post.id);
  const { data: currentUserFollowUser } = useIsFollowedByCurrentUser(
    post.userId
  );
  const { data: userFollowCurrentUser } = useIsFollowingCurrentUser(
    post.userId
  );

  return (
    <div className="w-full max-w-[468px]">
      <PostOwner
        post={post}
        currentUserFollowUser={currentUserFollowUser}
        userFollowCurrentUser={userFollowCurrentUser}
      />
      <div className="relative w-full lg:h-[500px] md:h-[400px] h-[350px]">
        <Image
          fill
          priority
          sizes="468px"
          src={post.image}
          alt={post.description}
          className="object-contain bg-black rounded-lg dark:bg-slate-950"
        />
      </div>
      <Controller
        post={post}
        isLiked={isLiked as boolean}
        isSaved={isSaved as boolean}
        currentUserFollowUser={currentUserFollowUser as boolean}
        userFollowCurrentUser={userFollowCurrentUser as boolean}
      />
    </div>
  );
};

export default Card;
