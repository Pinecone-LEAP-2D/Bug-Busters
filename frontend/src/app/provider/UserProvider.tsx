"use client";
import { useRouter } from "next/navigation";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
// import { createUser } from "../../../../back-end/src/controller/user/createUser.controller";
import { logInUser } from "../../../../back-end/src/controller/user/logIn.controller";
import { jwtDecode } from "jwt-decode";

type userContextType = {
  userName: string;
  email: string;
  password: string;
  createUser: ({
    email,
    password,
    userName,
  }: {
    email: string;
    password: string;
    userName: string;
  }) => Promise<void>;
  logInUser: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
};

type DecodedToken = {
  userId: number;
  email: string;
  username: string;
};
const getDecodedToken = async (token: string | null) => {
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const UserContext = createContext<userContextType>({} as userContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userContextType>({} as userContextType);
  const [token, setToken] = useState<string | null>(null);
  const [client, setClient] = useState<DecodedToken | null>();

  const router = useRouter();

  const createUser = async ({
    email,
    password,
    userName,
  }: {
    email: string;
    password: string;
    userName: string;
  }) => {
    // const { email, password, userName } = useUser();
    const response = await axios.post("http://localhost:8000/user", {
      email,
      password,
      userName,
    });
    console.log("createUser ", response);
  };
  const logInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post("http://localhost:8000/user/logIn", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    router.push("/profile");
    console.log("logInUser ", response);
    const getUser = async () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      const user = await getDecodedToken(storedToken);
      setClient(user);
    };

    useEffect(() => {
      getUser();
    }, []);
  };
  return (
    <UserContext.Provider
      value={{
        createUser: createUser,
        logInUser: logInUser,
        email: client?.email,
        userId: client?.userId,
        username: client?.username,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.log("hohho");
  }
  return context;
};
