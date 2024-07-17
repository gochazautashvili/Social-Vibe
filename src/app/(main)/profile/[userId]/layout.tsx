import { ReactNode } from "react";
import ProfileInfo from "./components/ProfileInfo";
import { getAllUser } from "@/data/user";

interface Props {
  children: ReactNode;
  params: { userId: string };
}

const layout = ({ children, params }: Props) => {
  return (
    <div className="px-3 py-9">
      <ProfileInfo userId={params.userId} />
      {children}
    </div>
  );
};

export default layout;

export async function generateStaticParams() {
  const users = await getAllUser();

  return users.map((user) => ({
    userId: user.id,
  }));
}
