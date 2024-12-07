import {
  useLoaderData,
  useNavigation,
  Form,
  json,
  redirect,
} from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import supabase from "~/supabase-client";
import { Note } from "~/types";
import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";

export const loader = async () => {
  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return json(notes || []);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = formData.get("id");

  switch (intent) {
    case "delete": {
      const { error } = await supabase.from("notes").delete().eq("id", id);

      if (error) {
        return json({ error: error.message }, { status: 500 });
      }
      return redirect("/notes");
    }
    case "edit": {
      const noteText = formData.get("notes");
      const { error } = await supabase
        .from("notes")
        .update({ notes: noteText })
        .eq("id", id);

      if (error) {
        return json({ error: error.message }, { status: 500 });
      }
      return redirect("/notes");
    }
    default: {
      const noteText = formData.get("notes");
      const { error } = await supabase
        .from("notes")
        .insert({ notes: noteText });
      if (error) {
        return json({ error: error.message }, { status: 500 });
      }
      return redirect("/notes");
    }
  }
};

export default function NotesPage() {
  const notes = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [textAreaContent, setTextAreaContent] = useState("");

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (navigation.state === "idle") {
      setEditingNote(null);
      setTextAreaContent("");
    }
  }, [navigation.state]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Notes App</h1>

      <Form method="post" className="mb-6">
        <div className="flex flex-col space-y-4">
          <textarea
            name="notes"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder={editingNote ? "Edit your note" : "Write a new note"}
            value={textAreaContent}
            onChange={(e) => setTextAreaContent(e.target.value)}
            defaultValue={editingNote?.notes || ""}
            required
          />
          <input type="hidden" name="id" value={editingNote?.id || ""} />
          <button
            type="submit"
            name="intent"
            value={editingNote ? "edit" : "create"}
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 
                disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          >
            {editingNote ? "Update Note" : "Save Note"}
          </button>
        </div>
      </Form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Your Notes</h2>
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">
            No notes yet. Start writing!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white/20 shadow-md rounded-lg p-4 flex justify-between items-start"
            >
              <p className="flex-grow pr-4">{note.notes}</p>
              <div className="flex space-x-2">
                <Form method="post">
                  <input type="hidden" name="id" value={note.id} />
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNote(note);
                      setTextAreaContent(note.notes);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit size={20} />
                  </button>
                </Form>
                <Form method="post">
                  <input type="hidden" name="id" value={note.id} />
                  <button
                    type="submit"
                    name="intent"
                    value="delete"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </Form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-red-500 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600">Please try again later.</p>
    </div>
  );
}
