"use client";

import { useParams } from "next/navigation";
import AboutUser from "./components/AboutUser";
import SocialMediaUrl from "./components/SocialMediaUrl";
import RecentSupporters from "./components/RecentSupporters";
import BuyCoffee from "./components/BuyCoffee";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useAllProfiles } from "../../provider/AllProfileProvider";

type ProfileType = {
  about: string;
  avatarImage: string;
  backgroundImage: string;
  createdAt: string;
  id: number;
  name: string;
  socialMediaURL: string;
  successMessage: string;
  updatedAt: string;
  userId: number;
};

const UserDetailedProfile = () => {
  const { allProfiles } = useAllProfiles();

  const params = useParams();
  const username = params.username;
  const [profile, setProfile] = useState<ProfileType | undefined>(undefined);

  useEffect(() => {
    if (allProfiles && username) {
      const foundProfile = allProfiles.find((p: any) => p?.name === username);

      if (foundProfile) {
        setProfile(foundProfile as unknown as ProfileType);
      }
    }
  }, [allProfiles, username]);

  if (!profile)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>User not found</h1>
      </div>
    );

  const donorId = profile.userId;

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className="relative flex justify-center rounded-lg object-cover">
        <img
          className="w-full h-[300px] top-0"
          src={
            profile.backgroundImage
              ? profile.backgroundImage
              : "/loadingGif.gif"
          }
        />
        <div className="w-[1280px] h-auto grid grid-cols-2 gap-6 absolute top-[250px] p-4">
          <AboutUser
            username={profile.name}
            about={profile.about}
            avatar={profile.avatarImage}
          />
          <BuyCoffee donorId={donorId} />
          <SocialMediaUrl url={profile.socialMediaURL} />
          <div className="col-span-2">
            <RecentSupporters donorId={donorId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailedProfile;
