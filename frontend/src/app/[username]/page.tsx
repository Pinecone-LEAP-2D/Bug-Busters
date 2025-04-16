"use client";

import { useParams } from "next/navigation";
import AboutUser from "./components/AboutUser";
import SocialMediaUrl from "./components/SocialMediaUrl";
import RecentSupporters from "./components/RecentSupporters";
import BuyCoffee from "./components/BuyCoffee";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { ProfileType } from "@/type";
import { useAllProfiles } from "../provider/AllProfileProvider";

const UserDetailedProfile = () => {
  const { allProfiles } = useAllProfiles();

  const params = useParams();
  const username = params.username;
  const [profile, setProfile] = useState<ProfileType | undefined>(undefined);

  useEffect(() => {
    const findProfile = (profile: any) => {
      return profile?.name === username;
    };
    const found = allProfiles?.find(findProfile);
    setProfile(found);
  }, [allProfiles]);

  if (!profile) return <>Not found</>;
  const donorId = profile.userId;
  console.log("dsadasdas", profile);

  return (
    <div className="w-screen h-screen flex flex-col  ">
      <Header />
      <div className=" relative flex justify-center rounded-lg ">
        <div className="w-full h-[300px] bg-red-300 top-0">Cover image</div>
        <div className="bg-blue-300 w-[1280px] h-auto grid grid-cols-2 gap-6 absolute top-[250px] p-4">
          <AboutUser
            username={profile?.name}
            about={profile?.about}
            avatar={profile?.avatarImage}
          />
          <BuyCoffee donorId={donorId} />
          <SocialMediaUrl url={profile?.socialMediaURL} />
          <div className="col-span-2">
            <RecentSupporters
              name={profile?.name}
              avatar={profile?.avatarImage}
              donorId={donorId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailedProfile;
