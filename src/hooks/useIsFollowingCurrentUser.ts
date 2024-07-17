import { getIsUserFollowingCurrentUser } from "@/data/follow";
import useSWR from "swr";

const fetcher = (id: string) =>
  getIsUserFollowingCurrentUser(id).then((res) => res);

const useIsFollowingCurrentUser = (id: string) => {
  return useSWR(`/api/isFollowingCurrentUser/${id}`, () => fetcher(id));
};

export default useIsFollowingCurrentUser;
