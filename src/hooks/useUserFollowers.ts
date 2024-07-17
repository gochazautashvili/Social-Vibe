import { getCurrentUserFollowers } from "@/actions/follow";
import useSWR from "swr";

const fetcher = () => getCurrentUserFollowers().then((res) => res);

const useUserFollowers = () => {
  return useSWR("/api/user/followers", fetcher);
};

export default useUserFollowers;
