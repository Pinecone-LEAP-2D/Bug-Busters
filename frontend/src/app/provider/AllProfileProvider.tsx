"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AllProfileContextType, AllProfileType } from "@/type";
import { getAllProfiles } from "@/utils/profileRequest";

const AllProfileContext = createContext<AllProfileContextType>(
    {} as AllProfileContextType
);

export const AllProfileProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const fetchAllProfile = async () => {
        const { data } = await getAllProfiles();
        return data;
    };

    const {
        data: profiles,
        error,
        isLoading,
        isError,
        refetch,
    } = useQuery<AllProfileType[]>({ queryKey: ["profiles"], queryFn: fetchAllProfile });

    return (
        <AllProfileContext.Provider
            value={{ profiles: profiles, refetch: refetch, isLoading }}
        >
            {children}
        </AllProfileContext.Provider>
    );
};

export const useAllProfile = () => {
    const context = useContext(AllProfileContext);
    return context;
};