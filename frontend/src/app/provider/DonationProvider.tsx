"use client";
import axios, { AxiosResponse } from "axios";
import { useState, createContext, useContext, useEffect } from "react";
// import { getProfile } from "../../../../back-end/src/controller/profile/getProfile.controller";

type donationContextType = {
  getDonation: () => Promise<AxiosResponse<any, any>>;
};

const DonationContext = createContext<donationContextType>(
  {} as donationContextType
);
export const getDonation = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/donation`
  );
  //   console.log(response);
  return response.data.data;
};
export const DonationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [donation, setDonation] = useState<donationContextType>(
    {} as donationContextType
  );

  useEffect(() => {}, []);

  return (
    <DonationContext.Provider value={{ getDonation: getDonation }}>
      {children}
    </DonationContext.Provider>
  );
};
export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    console.log("hohho");
  }
  return context;
};
