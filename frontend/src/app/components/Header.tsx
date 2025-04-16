"use client";

import { ChevronDown } from "lucide-react";
import CoffeeIcon from "../assets/CoffeeIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "../provider/UserProvider";
import { useEffect } from "react";
import { useProfile } from "../provider/ProfileProvider";

const Header = () => {
  const { username, getUser } = useUser();
  const { profile } = useProfile();
  const router = useRouter();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
    toast.success("👋 You’ve been logged out. See you soon!", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="w-screen h-[60px] flex justify-center cursor-default  px-4 py-2">
      <div className="max-w-7xl h-full w-full  flex justify-between items-center">
        <button
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => router.push("/homePage")}
        >
          <CoffeeIcon />
          <h1 className="font-semibold">Buy Me Coffee</h1>
        </button>
        <div className="flex items-center gap-2">
          <img
            src={profile?.avatarImage}
            className="object-cover w-10 h-10 rounded-full"
          />
          <p className="text-[14px] font-semibold">{username}</p>
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <ChevronDown className="w-4 h-4" />
            </PopoverTrigger>
            <PopoverContent className="w-32 flex items-center justify-center">
              <button
                className="border py-1 px-2 rounded-sm cursor-pointer"
                onClick={handleSignOut}
              >
                Log out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
