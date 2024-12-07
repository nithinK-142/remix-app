import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Notes App" },
    { name: "description", content: "Simple Notes Application" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Welcome to Notes App
        </h1>
        <p className="text-gray-600 mb-8">
          Capture your thoughts, ideas, and reminders in one place.
        </p>
        <Link
          to="/notes"
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 
          transition duration-300 inline-block shadow-md"
        >
          Start Taking Notes
        </Link>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>Built with Remix, Supabase, and Tailwind CSS</p>
      </div>
    </div>
  );
}
