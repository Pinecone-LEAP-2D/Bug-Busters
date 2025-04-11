"use client";

import ShareLinkIcon from "../assets/ShareLinkIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useDonation } from "@/app/provider/DonationProvider";
import { useUser } from "@/app/provider/UserProvider";
import axios from "axios";

const UserInformation = () => {
  // const { getTotalEarning } = useDonation();
  const { email, username, userId } = useUser();
  const [donations, setDonations] = useState([]);

  const getTotalEarning = async () => {
    const { userId, email } = useUser();
    console.log(email, "hu");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/donation/total-earning/${userId}`
    );
    console.log(response);
    return response.data;
  };
  useEffect(() => {
    getTotalEarning();
    // fetchData();
  }, []);
  return (
    <div className="w-full h-auto p-6 border border-[#E4E4E7] rounded-lg ">
      <div className="flex justify-between pb-6">
        <div className="flex gap-2 cursor-default">
          <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
          <div className="text-black">
            <h1 className="font-semibold ">{username}</h1>
            <p className="text-[14px]">buymeacoffee.com/{email}</p>
          </div>
        </div>
        <button
          className="text-white cursor-pointer bg-black flex py-2 px-4 items-center justify-center gap-2 rounded-lg"
          // onClick={fetchData}
        >
          <ShareLinkIcon />
          <p>Share page link</p>
        </button>
      </div>

      <div className="flex flex-col gap-3 border-t-1 pt-6">
        <div className="text-[20px] text-black font-semibold flex gap-3 items-center">
          <h1 className="cursor-default">Earning</h1>
          <Select>
            <SelectTrigger className="w-[175px] cursor-pointer">
              <SelectValue
                placeholder="The last 30 days"
                className="text-black"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="light">
                Last 30 days
              </SelectItem>
              <SelectItem className="cursor-pointer" value="dark">
                Last 90 days
              </SelectItem>
              <SelectItem className="cursor-pointer" value="system">
                All time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h1 className="text-[36px] text-black font-semibold">$410</h1>
      </div>
    </div>
  );
};

export default UserInformation;
