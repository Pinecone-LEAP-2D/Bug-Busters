"use client";

import { useParams } from "next/navigation";

const UserDetailedProfile = () => {
  const params = useParams();
  const userId = params.userId;
  return <div>user name {userId}</div>;
};

export default UserDetailedProfile;
