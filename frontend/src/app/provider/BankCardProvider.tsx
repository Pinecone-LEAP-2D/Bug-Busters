"use client";

import { useState } from "react";
import { useUser } from "./UserProvider";
import { getBankCardById } from "@/utils/axios";
import { createContext, useContext, useEffect } from "react";
import { Loading } from "@/components/Loading";
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
  getData: () => Promise<null | undefined>;
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
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    if (!userId) return;
    try {
      let response;
      if (userId) {
        response = await getBankCardById(userId);
      }
      setBankCard(response?.response || []);
      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        return null;
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getData();
    }
  }, [userId]);
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
