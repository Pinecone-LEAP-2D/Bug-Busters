"use client";
import axios, { AxiosResponse } from "axios";
import { parseAsFloat, useQueryState } from "nuqs";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useUser } from "./UserProvider";
import { Donation } from "@/type";
import { Loading } from "@/components/Loading";

type donationContextType = {
  days: number;
  totalEarning: number;
  donations: Donation[];
  amount: number;
  smallLoading: boolean;
};

const DonationContext = createContext<donationContextType>(
  {} as donationContextType
);

export const DonationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useUser();
  const [days] = useQueryState("days", parseAsFloat.withDefault(0));
  const [amount] = useQueryState("amount", parseAsFloat.withDefault(0));
  const [totalEarning, setTotalEarning] = useState(0);
  const [loading, setLoading] = useState(true);

  const getTotalEarning = async () => {
    if (!userId) return;
    setSmallLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/donation/total-earning/${userId}`
    );
    setSmallLoading(false);
    setTotalEarning(data.totalEarnings);
    setLoading(false);
  };
  const [donations, setDonations] = useState<Donation[]>([]);
  const [smallLoading, setSmallLoading] = useState(false);
  console.log(smallLoading);

  const getDonation = async () => {
    if (!userId) return;
    try {
      const queryParams = new URLSearchParams();
      if (amount !== 0) queryParams.append("amount", amount.toString());
      if (days !== 0) queryParams.append("days", days.toString());
      setSmallLoading(true);
      const queryString = queryParams.toString();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/donation/search/${userId}?${queryString}`
      );
      // console.log("Filtered Donations:", response.data.donations);
      setDonations(response.data.donations);
      setSmallLoading(false);
    } catch (err) {
      console.error("Error fetching donations:", err);
    }
  };
  useEffect(() => {
    if (userId) {
      getTotalEarning();
      getDonation();
    }
  }, [days, amount, userId]);

  return (
    <DonationContext.Provider value={{ days, totalEarning, donations, amount }}>
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
