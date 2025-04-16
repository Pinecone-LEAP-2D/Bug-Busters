"use client";
import { useDonation } from "@/app/provider/DonationProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseAsFloat, useQueryState } from "nuqs";
import { Skeleton } from "@/components/ui/skeleton";

const RecentTransactions = () => {
  const [amount, setAmount] = useQueryState(
    "amount",
    parseAsFloat.withDefault(0)
  );
  const set = (values: number) => {
    setAmount(values);
  };
  const { donations, smallLoading } = useDonation();
  console.log(smallLoading, "smallLoading");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <p className="font-semibold"> Recent transactions</p>
        <Select onValueChange={(values) => set(Number(values))}>
          <SelectTrigger className="w-[175px] cursor-pointer">
            <SelectValue placeholder="Amount" className="text-black" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="1">
              $1
            </SelectItem>

            <SelectItem className="cursor-pointer" value="2">
              $2
            </SelectItem>
            <SelectItem className="cursor-pointer" value="5">
              $5
            </SelectItem>
            <SelectItem className="cursor-pointer" value="10">
              $10
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {smallLoading == true ? (
        <Skeleton className="w-full h-[150px] rounded-2xl" />
      ) : (
        <>
          {donations.length > 0 ? (
            <>
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
                        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                          <img
                            className="object-cover"
                            src={element.donor.profile.avatarImage}
                          />
                        </div>
                        <div>
                          <h1 className="text-[14px]">
                            {element.donor.profile.name}
                          </h1>
                          <p className="text-[12px]">
                            {element.SocialMediaUrl}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-[16px] font-semibold">
                          {element.amount}$
                        </h1>
                        <p className="text-[12px]">{timeAgo}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[14px]">{element.specialMessage}</p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="w-full border rounded-lg p-10 text-center shadow-sm">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                You don’t have any supporters yet
              </h2>
              <p className="text-gray-500">
                Share your page with your audience to get started.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecentTransactions;
