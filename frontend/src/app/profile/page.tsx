"use client";

import { Header } from "@/components/Header";
import ProfileForm from "./_components/ProfileForm";
import BankCard from "./_components/BankCard";
import { useState } from "react";

const CreateProfile = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="p-5 w-full h-screen">
      <Header />
      <div className="flex justify-center items-center w-full h-full">
        {step === 1 && <ProfileForm setStep={setStep} step={step} />}
        {step === 2 && <BankCard setStep={setStep} />}
      </div>
    </div>
  );
};

export default CreateProfile;
