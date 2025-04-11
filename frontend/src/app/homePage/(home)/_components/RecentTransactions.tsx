"use client";
import SocialMediaUrl from "@/app/[userId]/components/SocialMediaUrl";
import { useDonation } from "@/app/provider/DonationProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import createBankCard from "../../../../../../back-end/src/controller/bankCard/createBankCard.controller";

const RecentTransactions = () => {
  const { getDonation } = useDonation();
  const [donations, setDonations] = useState();

  const fetchData = async () => {
    const res = await getDonation();
    console.log("donation data", res);
    setDonations(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <p className="font-semibold"> Recent transactions</p>
        <Select>
          <SelectTrigger className="w-[175px] cursor-pointer">
            <SelectValue placeholder="Amount" className="text-black" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="$1">
              $1
            </SelectItem>
            <SelectItem className="cursor-pointer" value="$2">
              $2
            </SelectItem>
            <SelectItem className="cursor-pointer" value="$5">
              $5
            </SelectItem>
            <SelectItem className="cursor-pointer" value="$10">
              $10
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {donations?.map((element, index) => {
        const createdAt = new Date(element.createdAt);
        const now = Date.now();

        const diffMs = now - createdAt.getTime();
        const diffHours = Math.floor(diffMs / 1000 / 60 / 60);

        let timeAgo = "";

        if (diffHours >= 24) {
          const days = Math.floor(diffHours / 24);
          const hours = diffHours % 24;
          timeAgo = `${days} days and ${hours} hours ago`;
        } else {
          timeAgo = `${diffHours} hours ago`;
        }

        return (
          <div
            className="w-full h-auto p-6 border-2 cursor-default rounded-lg flex flex-col gap-3"
            key={index}
          >
            <div className="flex justify-between">
              <div className="flex gap-1.5">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <h1 className="text-[14px]">{element.donor.profile.name}</h1>
                  <p className="text-[12px]">{element.SocialMediaUrl}</p>
                </div>
              </div>
              <div>
                <h1 className="text-[16px] font-semibold">{element.amount}$</h1>
                <p className="text-[12px]">{timeAgo}</p>
              </div>
            </div>
            <div>
              <p className="text-[14px]">{element.specialMessage}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentTransactions;
