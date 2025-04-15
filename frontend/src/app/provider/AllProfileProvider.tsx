"use client";

import { getAllProfiles } from "@/utils/axios";
import { useEffect, useState, createContext, useContext } from "react";

type ProfileType = {
  [x: string]: string | undefined;
  name: string;
  about: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
};

type ProfilesContextType = {
  allProfiles: ProfileType[];
  getData: () => Promise<void>;
};

const AllProfileContext = createContext<ProfilesContextType>(
  {} as ProfilesContextType
);

export const AllProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allProfiles, setAllProfiles] = useState<ProfileType[]>([]);

  const getData = async () => {
    try {
      const response = await getAllProfiles();
      setAllProfiles(response?.allProfile || []);
    } catch (err) {
      console.log("error in get data from get all profile provider", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AllProfileContext.Provider
      value={{
        allProfiles,
        getData,
      }}
    >
      {children}
    </AllProfileContext.Provider>
  );
};

export const useAllProfiles = () => {
  const context = useContext(AllProfileContext);

  return context;
};

export default AllProfileProvider;
