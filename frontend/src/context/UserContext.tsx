'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type User = {
  id: number;
  username: string;
} | null;

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
