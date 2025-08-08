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
    <div className='flex justify-center'>
      <form className='flex flex-col space-y-4 p-8 w-1/4 justify-center items-start bg-base-300 rounded-lg' onSubmit={handleSubmit}>
        <div className='flex justify-center items-center w-full flex-col'>
          <div className='text-2xl'>Register for DND Notes</div>
           <div className="divider"></div>
        </div>
        <div className='w-full'>
          <fieldset className='fieldset w-full'>
            <legend className="fieldset-legend">Username</legend>
            <input placeholder="Username" className="input w-full" value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Password</legend>  
            <input type='password' placeholder='Password' className="input w-full"
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Confirm Password</legend>  
            <input type="password" placeholder="Confirm password" className="input w-full" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </fieldset>
        </div>
        <button className="btn btn-primary w-full" type="submit">Submit</button>
        {error && <div className='text-error'>{error}</div>}
      </form>
    </div>
  );
}
