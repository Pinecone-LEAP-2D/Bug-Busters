"use client";

import { getAllProfiles } from "@/utils/axios";
import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import { useUser } from "./UserProvider";

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
  updateCoverPhoto: (values: string) => Promise<any>;
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
  const { userId } = useUser();
  console.log(userId);

  const updateCoverPhoto = async (values: string) => {
    console.log(values);

    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${userId}`,
      {
        backgroundImage: values,
      }
    );
    console.log(data);

    return data;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AllProfileContext.Provider
      value={{
        allProfiles,
        getData,
        updateCoverPhoto,
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
