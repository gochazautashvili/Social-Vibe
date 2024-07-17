import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import { getAllUser } from "@/data/user";

const layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}) => {
  return (
    <div className="mt-8 w-[1200px] h-[640px] overflow-y-auto rounded border-2 border-gray-500 mx-auto relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-500">
      <Navbar userId={params.userId} />
      <div className="p-4">
        <div className="flex justify-center gap-6 flex-wrap basis-[200]">
          {children}
        </div>
      </div>
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
