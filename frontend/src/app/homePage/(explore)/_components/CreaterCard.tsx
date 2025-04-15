import { useAllProfiles } from "@/app/provider/AllProfileProvider";
import ViewProfileIcon from "../_assets/ViewProfileIcon";
import Link from "next/link";
import { useParams } from "next/navigation";

const CreaterCard = () => {
  const { id } = useParams();
  const userName = "BaldanPerenlee";
  const { allProfiles } = useAllProfiles();
  console.log(allProfiles);

  return (
    <div className="flex flex-col gap-4 ">
      {allProfiles.map((profile) => (
        <div
          className="w-full h-auto p-6 border cursor-default flex flex-col gap-4 rounded-lg"
          key={profile.id}
        >
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {profile.avatarImage ? (
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={profile.avatarImage}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300" />
              )}
              <h1 className="text-[20px] font-semibold">{profile.name}</h1>
            </div>
            <Link href={`/${profile.name}`}>
              <button className="px-4 cursor-pointer py-2 flex items-center gap-2 justify-center font-medium bg-[#F4F4F5] rounded-lg">
                <p>View profile</p>
                <ViewProfileIcon />
              </button>
            </Link>
          </div>
          <div className="flex justify-between">
            <div className="w-1/2 flex flex-col gap-2">
              <h1 className="font-semibold">About {profile.name}</h1>
              <p className="text-[14px]">{profile.about}</p>
            </div>
            <div className="w-1/2 flex flex-col gap-2 pl-12">
              <h1 className="font-semibold">Social media URL</h1>
              <p>{profile.socialMediaURL}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreaterCard;
