"use client";

import { useState } from "react";
import { useUser } from "./UserProvider";
import { getBankCardById } from "@/utils/axios";
import { createContext, useContext, useEffect } from "react";

type BankCard = {
  id: number;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
};

type BankCardContextType = {
  bankCard: BankCard[];
  getData: () => Promise<void>;
};

const BankCardContext = createContext<BankCardContextType>(
  {} as BankCardContextType
);

export const BankCardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useUser();
  const [bankCard, setBankCard] = useState([]);

  const getData = async () => {
    try {
      let response;
      if (userId) {
        response = await getBankCardById(userId);
      }
      console.log("API response:", response);
      setBankCard(response.response || []);
    } catch (error) {
      console.error("Error getting user bank card detail", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <BankCardContext.Provider
      value={{
        bankCard,
        getData,
      }}
    >
      {children}
    </BankCardContext.Provider>
  );
};

export const useBankCard = () => {
  const context = useContext(BankCardContext);
  return context;
};
