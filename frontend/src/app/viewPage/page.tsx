"use client";

import { useState } from "react";
import { EditProfile } from "./_features/EditProfile";
import { UploadCover } from "./_features/UploadCover";
import { ShowProfile } from "./_features/ShowProfile";
import { useUser } from "../provider/UserProvider";
import Header from "../components/Header";
import DonationForm from "./_components/DonationField";

export default function Home() {
  const { userId } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="">
      <Header />
      <div>
        <UploadCover />
        <div className="w-full flex justify-center">
          <div className="flex w-[80%] justify-center items-start gap-16">
            {isEditing ? (
              <EditProfile userId={userId} setIsEditing={setIsEditing} />
            ) : (
              <ShowProfile userId={userId} setIsEditing={setIsEditing} />
            )}
            <DonationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
