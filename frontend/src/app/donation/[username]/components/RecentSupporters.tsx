import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const RecentSupporters = ({ name, donorId }) => {
  const [donation, setDonation] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/donation/${donorId}`
      );
      setDonation(response.data.data);
    };

    getData();
  }, []);

  if (!donation) return null;
  console.log(donation);
  console.log(donorId);

  return (
    <div className="p-6 rounded-lg w-[625px] h-auto flex flex-col gap-6   bg-white ">
      <h1 className="font-medium mb-6">Recent supporters</h1>

      <div className="flex gap-6">
        <img
          className="w-10 h-10 rounded-full"
          src={donation[0]?.donor?.profile?.avatarImage}
        />
        <div className="w-[500px] h-auto">
          <p className="font-medium mb-6">
            {donation[0]?.donor?.profile?.name} bought ${donation[0]?.amount}
          </p>
          <p>{donation[0]?.specialMessage}</p>
        </div>
      </div>
      <button className="w-full flex h-auto py-2 items-center gap-2 justify-center border rounded-sm">
        See more <ChevronDown className="w-4 h-4 " />
      </button>
    </div>
  );
};

export default RecentSupporters;
