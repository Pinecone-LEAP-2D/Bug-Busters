import { ChevronDown } from "lucide-react";
import CoffeeIcon from "../assets/CoffeeIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  return (
    <div className="w-screen h-[60px] flex justify-center cursor-default  px-4 py-2">
      <div className="max-w-7xl h-full w-full  flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <CoffeeIcon />
          <h1 className="font-semibold">Buy Me Coffee</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <p className="text-[14px]">User name</p>
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <ChevronDown className="w-4 h-4" />
            </PopoverTrigger>
            <PopoverContent className="w-32 flex items-center justify-center">
              <button className="border py-1 px-2 rounded-sm cursor-pointer">
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
