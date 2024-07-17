import { getAllUser, getUserById } from "@/data/user";

const SettingsPage = async ({ params }: { params: { userId: string } }) => {
  const user = await getUserById(params.userId);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-xl">
        {user?.username} This page is&apos;t created yet!
      </h1>
      <p>it will be added in future!</p>
    </div>
  );
};

export default SettingsPage;

export async function generateStaticParams() {
  const users = await getAllUser();

  return users.map((user) => ({
    userId: user.id,
  }));
}
