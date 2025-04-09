"use client";
import { useRouter } from "next/navigation";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
// import { createUser } from "../../../../back-end/src/controller/user/createUser.controller";
import { logInUser } from "../../../../back-end/src/controller/user/logIn.controller";

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

const UserContext = createContext<userContextType>({} as userContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userContextType>({} as userContextType);
  const router = useRouter();

  useEffect(() => {
    const user1 = localStorage.getItem("user");
    if (user1) {
      const user = JSON.parse(user1);

      setUser(user!);
    }
  }, []);
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
    console.log("logInUser ", response);
  };
  return (
    <UserContext.Provider
      value={{
        userName: user.userName,
        email: user.email,
        password: user.password,
        createUser: createUser,
        logInUser: logInUser,
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
