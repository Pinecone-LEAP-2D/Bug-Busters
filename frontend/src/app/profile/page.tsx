"use client";

import { ProfileForm } from "./_components/ProfileForm";
import { useState } from "react";
import BankCard from "./_components/BankCard";

const CreateProfile = () => {
  const [step, setStep] = useState(1);
  const userId = 4;
  return (
    <div className="p-5">
      <div className="flex justify-center items-center h-full">
        {step === 1 && <ProfileForm setStep={setStep} userId={userId} />}
        {step === 2 && <BankCard setStep={setStep} />}
      </div>
    </div>
  );
};

export default CreateProfile;
