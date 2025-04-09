import ViewProfileIcon from "../_assets/ViewProfileIcon";
import Link from "next/link";
import { useParams } from "next/navigation";

const CreaterCard = () => {
  const { id } = useParams();
  const userName = "BaldanPerenlee";

  return (
    <div className="w-full h-auto p-6 border cursor-default flex flex-col gap-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <h1 className="text-[20px] font-semibold">User name</h1>
        </div>
        <Link href={`/${userName}`}>
          <button className="px-4 cursor-pointer py-2 flex items-center gap-2 justify-center font-medium bg-[#F4F4F5] rounded-lg">
            <p>View profile</p>
            <ViewProfileIcon />
          </button>
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2 flex flex-col gap-2">
          <h1 className="font-semibold">About Space ranger</h1>
          <p className="text-[14px]">
            All day, every day, we're watching, listening to, reading and
            absorbing politics. It's exhausting. We then report on what we've
            seen in a way that's as chill as possible. None of the
            sensationalism and division you'll find elsewhere. It's about cla
          </p>
        </div>
        <div className="w-1/2 flex flex-col gap-2 pl-12">
          <h1 className="font-semibold">Social media URL</h1>
          <p>https://buymeacoffee.com/baconpancakes1</p>
        </div>
      </div>
    </div>
  );
};

export default CreaterCard;
