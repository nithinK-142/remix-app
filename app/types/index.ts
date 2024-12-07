// app/types/index.ts
export interface Note {
  id?: number;
  notes: string;
  created_at?: string;
}

export interface NoteFormProps {
  note?: Note;
  onSubmit: (note: Omit<Note, "id" | "created_at">) => Promise<void>;
}
