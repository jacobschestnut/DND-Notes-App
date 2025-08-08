'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '../../../lib/auth';

export default function NewNotePage() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getAccessToken();
    
    if (!token) {
      router.push('/login');
      return;
    }

    const res = await fetch('http://localhost:8000/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      router.push('/notes');
    } else {
      const data = await res.json();
      setError(data?.detail || 'Failed to create note');
    }
  };

  return (
    <div>
      <h1>New Note</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          rows={5}
          style={{ width: '100%' }}
        />
        <br />
        <button type="submit">Create Note</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
