"use client";
import { useState } from "react";
import Logo from "@/components/Logo";
import { Coffee } from "lucide-react";
import Link from "next/link";
import { LoginFirst } from "../Login/_components/Login";

const Login = () => {
  return (
    <>
      <div className="flex w-full justify-between h-screen">
        <div className="w-1/2 h-screen bg-[#fbbf24]">
          <div className="font-bold text-base leading-5 align-middle flex p-5">
            <Coffee />
            Buy Me Coffee
          </div>
          <div className="flex flex-col justify-center items-center h-full ">
            <div className="w-[350px] flex flex-col justify-center items-center gap-5">
              <Logo />
              <div>
                <div className="font-bold text-2xl tracking-normal text-center">
                  Fund your creative work
                </div>
                <div className="font-normal text-base text-sm leading-6 tracking-normal text-center">
                  Accept support. Start a membership. Setup a shop. It’s easier
                  than you think.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 relative">
          <Link
            className="absolute top-5 right-5 bg-gray-200 p-2 text-black rounded-sm"
            href={"/sign-up"}
          >
            Sign up
          </Link>
          <div className=" w-full h-full flex justify-center items-center text-gray-500 text-sm">
            <LoginFirst />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
