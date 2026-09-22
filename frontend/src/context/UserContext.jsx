import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 'user_client_1',
    name: 'Jordan (Client)',
    role: 'client'
  });

  const toggleRole = () => {
    if (currentUser.role === 'client') {
      setCurrentUser({
        id: 'user_creator_1',
        name: 'Alex (Creator)',
        role: 'creator'
      });
    } else {
      setCurrentUser({
        id: 'user_client_1',
        name: 'Jordan (Client)',
        role: 'client'
      });
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, toggleRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);