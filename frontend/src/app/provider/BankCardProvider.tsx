"use client";

import { useState } from "react";
import { useUser } from "./UserProvider";
import { getBankCardById } from "@/utils/axios";
import { createContext, useContext, useEffect } from "react";

const BankCardContext = createContext({
  bankCard: [],
});

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
      setBankCard(response.response);
      console.log("user bank card", response.response);
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
