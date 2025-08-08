'use client';

import { useRouter } from 'next/navigation';
import { clearTokens } from '../../lib/auth';
import { useUser } from '../../context/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser } = useUser();


  const handleLogout = () => {
    clearTokens();
    localStorage.clear();
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DND Notes</a>
      </div>
      <div className="flex-none">
        {user && (
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>{user.username}</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li><a onClick={handleLogout}>Logout</a></li>
                  <li><a>My Notes</a></li>
                </ul>
              </details>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}