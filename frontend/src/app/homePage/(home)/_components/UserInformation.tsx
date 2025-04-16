"use client";

import ShareLinkIcon from "../assets/ShareLinkIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/app/provider/UserProvider";
import { useDonation } from "@/app/provider/DonationProvider";
import { parseAsFloat, useQueryState } from "nuqs";
import { useState } from "react";
import { useProfile } from "@/app/provider/ProfileProvider";

const UserInformation = () => {
  const { email, username } = useUser();

  const [days, setDays] = useQueryState("days", parseAsFloat.withDefault(0));
  const { totalEarning } = useDonation();
  const { profile } = useProfile();

  const set = (values: number) => {
    setDays(values);
  };

  return (
    <div className="w-full h-auto p-6 border border-[#E4E4E7] rounded-lg ">
      <div className="flex justify-between pb-6">
        <div className="flex gap-2 cursor-default">
          <div className="w-12 h-12 bg-gray-400 rounded-full">
            {
              <img
                alt="Donor Avatar"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src={profile?.avatarImage}
                className="object-cover"
              />
            }
          </div>
          <div className="text-black">
            <h1 className="font-semibold ">{username}</h1>
            <p className="text-[14px]">buymeacoffee.com/{email}</p>
          </div>
        </div>
        <button className="text-white cursor-pointer bg-black flex py-2 px-4 items-center justify-center gap-2 rounded-lg">
          <ShareLinkIcon />
          <p>Share page link</p>
        </button>
      </div>

      <div className="flex flex-col gap-3 border-t-1 pt-6">
        <div className="text-[20px] text-black font-semibold flex gap-3 items-center">
          <h1 className="cursor-default">Earning</h1>
          <Select onValueChange={(values) => set(Number(values))}>
            <SelectTrigger className="w-[175px] cursor-pointer">
              <SelectValue
                placeholder="The last 30 days"
                className="text-black"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="30">
                Last 30 days
              </SelectItem>
              <SelectItem className="cursor-pointer" value="60">
                Last 60 days
              </SelectItem>
              <SelectItem className="cursor-pointer" value="1000">
                All time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h1 className="text-[36px] text-black font-semibold">
          ${totalEarning}
        </h1>
      </div>
    </div>
  );
};

export default UserInformation;
