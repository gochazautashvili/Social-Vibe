import NotificationCard from "./NotificationCard";
import { CommentSkeleton } from "../card/Controller";
import useNotification from "@/hooks/useNotification";

const Notifications = () => {
  const { data: notifications, isLoading } = useNotification();

  if (isLoading) {
    return <CommentSkeleton />;
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 mt-5">
      {notifications && notifications.length < 1 && (
        <h1>Notifications is empty</h1>
      )}

      {notifications &&
        notifications.map((notification) => {
          return (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          );
        })}
    </div>
  );
};

export default Notifications;
