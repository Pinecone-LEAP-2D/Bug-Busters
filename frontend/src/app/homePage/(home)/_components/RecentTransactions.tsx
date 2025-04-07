"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RecentTransactions = () => {
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
      <div className="w-full h-auto p-6 border-2 cursor-default rounded-lg flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex gap-1.5">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <h1 className="text-[14px]">User name</h1>
              <p className="text-[12px]">User url</p>
            </div>
          </div>
          <div>
            <h1 className="text-[16px] font-semibold">+ $1</h1>
            <p className="text-[12px]">10 hours ago</p>
          </div>
        </div>
        <div>
          <p className="text-[14px]">
            Thank you for being so awesome everyday! You always manage to
            brighten up my day when I’m feeling down. Although $1 isn’t that
            much money it’s all I can contribute at the moment
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
