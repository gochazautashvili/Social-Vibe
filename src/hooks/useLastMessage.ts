import { getLastMessage } from "@/data/messages";
import useSWR from "swr";

const fetcher = (id: string | undefined) =>
  getLastMessage(id).then((res) => res);

const useLastMessage = (id: string | undefined) => {
  return useSWR(`/api/lastMessage/${id}`, () => fetcher(id));
};

export default useLastMessage;
