"use client";

import { useParams } from "next/navigation";
import AboutUser from "./components/AboutUser";
import SocialMediaUrl from "./components/SocialMediaUrl";
import RecentSupporters from "./components/RecentSupporters";
import BuyCoffee from "./components/BuyCoffee";
import Header from "../components/Header";

const UserDetailedProfile = () => {
  // const params = useParams();
  // const userId = params.userId;
  return (
    <div className="w-screen h-screen flex flex-col  ">
      <Header />
      <div className=" relative flex justify-center rounded-lg  mt-[50px]">
        <div className="w-full h-[300px] bg-red-300 top-0">Cover image</div>
        <div className="bg-blue-300 w-[1280px] h-auto grid grid-cols-2 gap-6 absolute top-[250px] p-4">
          <AboutUser />
          <BuyCoffee />
          <SocialMediaUrl />
          <div className="col-span-2">
            <RecentSupporters />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailedProfile;
