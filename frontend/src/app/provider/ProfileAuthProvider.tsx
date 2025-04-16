"use client";

import { useRouter, usePathname } from "next/navigation";
import { useUser } from "./UserProvider";
import { useProfile } from "./ProfileProvider";
import { useEffect } from "react";

const ProfileAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { profile, isLoading } = useProfile();
  const { userId } = useUser();

  useEffect(() => {
    if (pathname === "/homePage" && !profile) {
      router.push("/profile");
      return;
    }

    if (pathname === "/profile" && profile) {
      router.push("/homePage");
      return;
    }
  }, [profile, isLoading, pathname, userId]);

  return <>{children}</>;
};

export default ProfileAuthProvider;
