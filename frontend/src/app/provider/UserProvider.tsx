"use client";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";

type DecodedToken = {
  userId: number;
  email: string;
  username: string;
};

type UserContextType = {
  email: string | undefined;
  username: string | undefined;
  userId: number | undefined;
  getUser: () => Promise<void>;
};

const getDecodedToken = async (token: string | null) => {
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [client, setClient] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(client);

  const getUser = async () => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    const user = await getDecodedToken(storedToken);
    setClient(user);
    console.log("User decoded from token:", user);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        email: client?.email,
        userId: client?.userId,
        username: client?.username,
        getUser,
      }}
    >
      {loading ? <p>...Loading user context</p> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.log("UserContext not available");
  }
  return context;
};
