import { getIsLikedPostByPostId } from "@/data/posts";
import useSWR from "swr";

const fetcher = (id: string) => getIsLikedPostByPostId(id).then((res) => res);

const useIsLikedPostByPostId = (id: string) => {
  return useSWR(`/api/useIsLikedPostByPostId/${id}`, () => fetcher(id));
};

export default useIsLikedPostByPostId;
