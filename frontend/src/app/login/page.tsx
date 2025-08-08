'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveTokens } from '../../lib/auth';
import { useUser } from '../../context/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
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

      const userRes = await fetch('http://localhost:8000/user/', {
        headers: {
          Authorization: `Bearer ${data.access}`,
          'Content-Type': 'application/json',
        },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }

      router.push('/');
    } else {
      setError('Username or password is incorrect.');
    }
  };

  return (
    <div className='flex justify-center'>
      <form className='flex flex-col space-y-4 p-8 w-1/4 justify-center items-start bg-base-300 rounded-lg' onSubmit={handleSubmit}>
        <div className='flex justify-center items-center w-full flex-col'>
          <div className='text-2xl'>Log in to DND Notes</div>
          <div className="divider"></div>
        </div>
        <div className='w-full'>
          <fieldset className='fieldset w-full'>
            <legend className="fieldset-legend">Username</legend>
            <input
              placeholder="Username"
              className="input w-full"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Password</legend>  
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </fieldset>
        </div>
        <button className="btn btn-primary w-full" type="submit">Login</button>
        {error && <div className='text-error'>{error}</div>}
        <p>No account? Register <a href='/register' className='link'>here</a>.</p>
      </form>
    </div>
  );

}
