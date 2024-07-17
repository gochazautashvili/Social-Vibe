import { getIsCurrentUserFollowUser } from "@/data/follow";
import useSWR from "swr";

const fetcher = (id: string) =>
  getIsCurrentUserFollowUser(id).then((res) => res);

const useIsFollowedByCurrentUser = (id: string) => {
  return useSWR(`/api/isFollowerByCurrentUser/${id}`, () => fetcher(id));
};

export default useIsFollowedByCurrentUser;
