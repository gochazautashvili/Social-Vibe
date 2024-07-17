import Image from "next/image";
import PostOwner from "./PostOwner";
import { PostsWhitUser } from "@/app/(main)/page";
import dynamic from "next/dynamic";
import { getIsLikedPostByPostId, getIsSavedPostByPostId } from "@/data/posts";
import {
  getIsCurrentUserFollowUser,
  getIsUserFollowingCurrentUser,
} from "@/data/follow";
import { getCommentsByPostId } from "@/data/comments";

const Controller = dynamic(() => import("./Controller"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-12 bg-primary/40 animate-pulse mt-3 rounded-lg"></div>
  ),
});

const Card = async ({ post }: { post: PostsWhitUser }) => {
  const isLiked = await getIsLikedPostByPostId(post.id);
  const isSaved = await getIsSavedPostByPostId(post.id);
  const currentUserFollowUser = await getIsCurrentUserFollowUser(post.userId);
  const userFollowCurrentUser = await getIsUserFollowingCurrentUser(
    post.userId
  );
  const comments = await getCommentsByPostId(post.id, 0);

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
        isLiked={isLiked}
        isSaved={isSaved}
        currentUserFollowUser={currentUserFollowUser}
        userFollowCurrentUser={userFollowCurrentUser}
        comments={comments}
      />
    </div>
  );
};

export default Card;
