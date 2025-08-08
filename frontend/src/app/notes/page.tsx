'use client';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../lib/auth';
import { useRouter } from 'next/navigation';

type Note = {
  id: number;
  content: string;
  created_at: string;
  author: number;
};

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetchWithAuth('http://localhost:8000/notes/');

        if (!res || !res.ok) {
          console.error('Failed to fetch notes');
          return;
        }

        const data = await res.json();
        setNotes(data)
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [router]); 

  return (
    <div>
      <h1>Your Notes</h1>
      <ul>
        {notes.map((note: Note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}
