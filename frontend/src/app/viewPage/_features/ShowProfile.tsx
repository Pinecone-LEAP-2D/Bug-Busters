'use client'

import { useProfile } from "@/app/provider/ProfileProvider";
import { Button } from "@/components/ui/button";
import { ProfileSchema } from "@/schema/profile";
import { EditProfileType, ProfileType } from "@/type";
import { useFormik } from "formik"
import { useState } from "react";

export const ShowProfile = (props: EditProfileType) => {
  const { profile, isLoading } = useProfile()

  if (!profile || isLoading) {
    return <>Loading</>
  }
  return <ProfileContent {...props} profile={profile} />
}

const ProfileContent = (props: EditProfileType & { profile: ProfileType }) => {
  const { userId, setIsEditing, profile } = props;

  const handleSubmit = () => {
    setIsEditing(true)
  }

  const formik = useFormik({
    initialValues: {
      ...(profile || {} as ProfileType),
      userId: userId,
    },
    validationSchema: ProfileSchema,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-white flex flex-col gap-5 w-[630px] h-[625px]">
        <div className="flex flex-col gap-3 border p-6 rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={formik.values.avatarImage} alt="avatar image" className="w-[48px] h-[48px] rounded-full" />
              <p className="font-bold text-xl">{formik.values.name}</p>
            </div>
            <Button type="submit">Edit page</Button>
          </div>
          <div className="border my-4"></div>
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold leading-6">About {formik.values.name}</p>
            <p className="text-sm font-normal leading-5">{formik.values.about}</p>
          </div>
        </div>
      </div>
    </form>
  )
}