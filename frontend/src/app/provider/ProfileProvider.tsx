"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProfileContextType } from "@/type";
import { getProfile } from "@/utils/profileRequest";

const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType
);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fetchProfile = async () => {
    const profileData = await getProfile();
    return profileData;
  };

  const {
    data: profile,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({ queryKey: ["profile"], queryFn: fetchProfile });

  return (
    <ProfileContext.Provider
      value={{ profile: profile, refetch: refetch, isLoading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  return context;
};