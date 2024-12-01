import { redirect, useLoaderData } from "@remix-run/react";
import { findUserById, User } from "~/users";

export const loader = async ({ params }: { params: { id: string } }) => {
  const user = await findUserById(params.id);

  if (!user) {
    return redirect("/");
  }

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
};

const Profile = () => {
  const loaderData = useLoaderData<User>();
  return (
    <div className="flex h-screen justify-center">
      <div className="flex flex-col gap-6 pt-40">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            User Profile
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {loaderData?.name}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {loaderData?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
