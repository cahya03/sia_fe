import React, { createContext, useContext, useState } from 'react';

const JwtContext = createContext();

export const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState({ jwt: "" });

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      {children}
    </JwtContext.Provider>
  );
};

export const useJwt = () => {
  return useContext(JwtContext);
};