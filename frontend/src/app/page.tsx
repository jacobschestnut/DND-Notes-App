'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../lib/auth";

type Note = {
  id: number;
  content: string;
  created_at: string;
  author: number;
};

export default function Home() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchWithAuth('http://localhost:8000/notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newNoteContent }),
      });

      setNewNoteContent('')
      
      await fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetchWithAuth('http://localhost:8000/notes/');

      if (!res || !res.ok) {
        console.error('Failed to fetch notes');
        return;
      }

      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [router]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/4 h-1/4">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <textarea
              className="textarea h-full w-full"
              placeholder="What's going on?"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              required
            />
          </fieldset>

          <button className="btn btn-primary w-full" type="submit">Submit</button>
        </form>

        <div className="">
          <ul>
            {notes.map((note: Note) => (
              <li key={note.id}>{note.content}{note.created_at}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
