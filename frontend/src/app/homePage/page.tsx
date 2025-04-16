"use client";

import { useState } from "react";
import ControllerBar from "./components/ControllerBar";
import Home from "./(home)/_features/Home";
import Explore from "./(explore)/_features/Explore";
import Settings from "./(settings)/_features/Settings";
import Header from "../components/Header";
import AllProfileProvider from "../provider/AllProfileProvider";

const HomePage = () => {
  const [step, setStep] = useState("home");
  return (
    <AllProfileProvider>
      <div className="w-screen h-screen bg-white gap-[50px] flex flex-col justify-center items-center pt-[100px]">
        <Header />
        <div className="max-w-7xl w-full h-auto flex justify-center">
          <ControllerBar setStep={setStep} step={step} />
          {step === "home" && <Home />}
          {step === "explore" && <Explore />}
          {step === "settings" && <Settings />}
        </div>
      </div>
    </AllProfileProvider>
  );
};

export default HomePage;
