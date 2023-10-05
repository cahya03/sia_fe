import React, { createContext, useContext, useState } from 'react';

const JwtContext = createContext();

export const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState({ 
    jwt: "" 
  });
  const [decodedToken, setDecodedToken] = useState({
      id_user: "",
      username: "",
      email: "",
      phone_number: "",
      role: ""
  });
  return (
    <JwtContext.Provider value={{jwt, setJwt, decodedToken, setDecodedToken}}>
      {children}
    </JwtContext.Provider>
  );
};

export const useJwt = () => {
  return useContext(JwtContext);
};