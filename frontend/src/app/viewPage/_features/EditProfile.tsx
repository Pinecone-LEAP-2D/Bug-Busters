'use client'

import { ProfileSchema } from "@/schema/profile";
import { ProfileProps } from "@/type";
import { useFormik } from "formik"
import { useState } from "react";

export const EditProfile = (props: ProfileProps) => {
  const { userId } = props;
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null)


  const handleSubmit = () => {

  }

  const formik = useFormik({
    initialValues: {
      userId: userId,
      name: "",
      about: "",
      socialMediaURL: "https://",
      backgroundImage: "",
      successMessage: "",
    },
    validationSchema: ProfileSchema,
    onSubmit: handleSubmit
  });

  return (
    <div className="bg-white w-full h-screen flex flex-col gap-5 rounded-2xl">

    </div>
  )
}