import { getNotifications } from "@/data/follow";
import useSWR from "swr";

const fetcher = () => getNotifications().then((res) => res);

const useNotification = () => {
  return useSWR("/api/notifications", fetcher);
};

export default useNotification;
