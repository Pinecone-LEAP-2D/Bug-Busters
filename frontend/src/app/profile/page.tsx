"use client";

import { ProfileForm } from "./_components/ProfileForm";
import { useState } from "react";
import BankCard from "./_components/BankCard";
import { useUser } from "../provider/UserProvider";
import Header from "../components/Header";

const CreateProfile = () => {
  const [step, setStep] = useState(1);
  const { userId } = useUser();
  return (
    <div className="flex flex-col gap-[50px]">
      <Header />
      <div className="flex justify-center items-center h-full">
        {step === 1 && <ProfileForm setStep={setStep} />}
        {step === 2 && <BankCard setStep={setStep} />}
      </div>
    </div>
  );
};

export default CreateProfile;
