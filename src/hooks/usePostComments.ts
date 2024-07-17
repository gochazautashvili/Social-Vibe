import { getCommentsByPostId } from "@/data/comments";
import useSWR from "swr";

const fetcher = (id: string) => getCommentsByPostId(id, 0).then((res) => res);

const usePostComments = (id: string) => {
  return useSWR(`/api/isFollowingCurrentUser/${id}`, () => fetcher(id));
};

export default usePostComments;
