import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const RecentSupporters = ({ donorId }) => {
  const [donation, setDonation] = useState([]);
  const [showAll, setShowAll] = useState(false);

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
  const displayedDonations = showAll ? donation.slice(0, 5) : [donation[0]];

  return (
        <div className="p-6 rounded-lg w-[625px] h-auto flex flex-col gap-6 bg-white">
      <h1 className="font-medium mb-6">Recent supporters</h1>

      <div
        className={`flex flex-col gap-4 transition-all duration-300 ${
          showAll ? "max-h-[350px] overflow-y-auto" : ""
        }`}
      >
        {displayedDonations.map((item, index) => (
          <div key={index} className="flex gap-6">
            <img
              className="w-10 h-10 rounded-full"
              src={item?.donor?.profile?.avatarImage}
              alt="Avatar"
            />
            <div className="w-[500px] h-auto">
              <p className="font-medium mb-2">
                {item?.donor?.profile?.name} bought ${item?.amount}
              </p>
              <p>{item?.specialMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {!showAll && donation.length > 1 && (
        <button
          className="w-full flex h-auto py-2 items-center gap-2 justify-center border rounded-sm"
          onClick={() => setShowAll(true)}
        >
          See more <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default RecentSupporters;
