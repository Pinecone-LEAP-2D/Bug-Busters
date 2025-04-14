"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProfileContextType, ProfileType } from "@/type";
import { getProfile } from "@/utils/profileRequest";
import { useUser } from "./UserProvider";

const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType
);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useUser();

  const fetchProfile = async () => {
    const { data } = await getProfile(userId as number);
    return data;
  };

  const {
    data: profile,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery<ProfileType>({ queryKey: ["profile"], queryFn: fetchProfile });

  return (
    <ProfileContext.Provider
      value={{ profile, refetch: refetch, isLoading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  return context;
};