'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const res = await fetch('http://localhost:8000/api/user/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(JSON.stringify(data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
      <input placeholder='Password'
        onChange={(e) => setConfirmPassword(e.target.value)} />
      <input type="password" placeholder="Retype password" value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button type="submit">Register</button>
      {error && <div>{error}</div>}
    </form>
  );
}
