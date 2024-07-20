"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { getPosts } from "@/data/posts";
import { PostsWhitUser } from "@/app/(main)/page";
import Card from "./card/Card";
import dynamic from "next/dynamic";

const c = dynamic(() => import("./card/Card"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-4 w-full max-w-[468px]">
      <div className="w-full h-10 bg-gray-400 rounded"></div>
      <div className="lg:h-[500px] md:h-[400px] h-[350px] bg-gray-400 rounded"></div>
    </div>
  ),
});

const Posts = ({ posts: initialPosts }: { posts: PostsWhitUser[] }) => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);
  const [lestPost, setLestPost] = useState(false);
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    const getAllPost = async () => {
      const next = page + 1;

      const res = await getPosts(next);

      if (res.length > 0) {
        setPosts((prev) => [...prev, ...res]);
        setPage(next);
      } else {
        setLestPost(true);
      }
    };

    if (inView) {
      getAllPost();
    }
  }, [inView, page]);

  return (
    <section className="flex flex-col items-center gap-10 flex-[6]">
      {posts.map((post) => {
        return <Card key={post.id} post={post} />;
      })}
      {lestPost && <p>There is&apos;t more posts!</p>}
      {!lestPost && posts.length < 10 && (
        <div className="flex justify-center w-full" ref={ref}>
          <Loader2 className="w-16 h-16 animate-spin" />
        </div>
      )}
    </section>
  );
};

export default Posts;
