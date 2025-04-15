import { ChevronDown } from "lucide-react";

const RecentSupporters = () => {
  return (
    <div className="p-6 rounded-lg w-[625px] h-auto flex flex-col gap-6   bg-white ">
      <h1 className="font-medium mb-6">Recent supporters</h1>
      <div className="flex gap-6">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="w-[500px] h-auto">
          <p className="font-medium mb-6">User name bought $1 coffee</p>
          <p>
            Thank you for being so awesome everyday! You always manage to
            brighten up my day when I’m feeling down. Although $1 isn’t that
            much money it’s all I can contribute at the moment.
          </p>
        </div>
      </div>
      <button className="w-full flex h-auto py-2 items-center gap-2 justify-center border rounded-sm">
        See more <ChevronDown className="w-4 h-4 " />
      </button>
    </div>
  );
};

export default RecentSupporters;
