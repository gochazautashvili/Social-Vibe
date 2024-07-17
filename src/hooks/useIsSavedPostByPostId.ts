import { getIsSavedPostByPostId } from "@/data/posts";
import useSWR from "swr";

const fetcher = (id: string) => getIsSavedPostByPostId(id).then((res) => res);

const useIsSavedPostByPostId = (id: string) => {
  return useSWR(`/api/isFollowingCurrentUser/${id}`, () => fetcher(id));
};

export default useIsSavedPostByPostId;
