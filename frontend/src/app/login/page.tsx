'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveTokens } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      saveTokens(data);
      router.push('/');
    } else {
      setError('Username or password is incorrect.');
    }
  };

  const handleNavigateToRegister = () => {
    router.push('/register');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
      <input type="password" placeholder="Password" value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button type="submit">Login</button>
      <button onClick={handleNavigateToRegister}>Register</button>
      {error && <div>{error}</div>}
    </form>
  );
}
