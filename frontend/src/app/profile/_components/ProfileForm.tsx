"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { Camera } from "lucide-react";
import { ProfileFormik, ProfileProps } from "@/type";
import { ProfileSchema } from "@/schema/profile";
import { createProfile } from "@/utils/profileRequest";
import axios from "axios";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const ProfileForm = (props: ProfileProps) => {
  const { step, setStep, userId } = props;
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null)

  const uploadCloudinary = async () => {
    if (!image) alert("Please insert photo");

    try {
      const file = new FormData();
      file.append("file", image as File);
      file.append("upload_preset", CLOUDINARY_UPLOAD_PRESET as string);
      file.append("api_key", CLOUDINARY_API_KEY as string);

      const response = await axios.post(API_URL, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      return response.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file)
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: ProfileFormik) => {
    try {
      const img_url = await uploadCloudinary()
      const newProfile = { ...values, avatarImage: img_url }
      console.log(newProfile);
      
      const fetchProfile = await createProfile(newProfile)
      console.log(fetchProfile);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
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
    <form
      onSubmit={formik.handleSubmit}
      className="w-[510px] p-4 flex flex-col gap-6"
    >
      <h2 className="text-lg font-semibold">Complete your profile page</h2>
      <div>
        <label className="block mb-1 font-medium">Add photo</label>
        <label
          htmlFor="avatarImage"
          className="flex flex-col items-center justify-center gap-y-2 cursor-pointer bg-gray-100 w-32 h-32 border rounded-full border-dashed"
        >
          <div className="w-full">
            <div className="flex justify-center">
              {avatarImage && <img src={avatarImage} alt="Preview" className="rounded-full w-28 h-28 object-cover" />}
              <input
                type="file"
                hidden
                id="avatarImage"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>
            <p className="flex items-center justify-center text-gray-300">
              <Camera />
            </p>
          </div>
        </label>
      </div>

      <div>
        <input
          name="name"
          type="text"
          placeholder="Enter your name here"
          className="border px-3 py-2 rounded w-full"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <textarea
          name="about"
          placeholder="Write about yourself here"
          className="border px-3 py-2 rounded w-full h-20"
          value={formik.values.about}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.about && formik.errors.about && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.about}</div>
        )}
      </div>

      <div>
        <input
          name="socialMediaURL"
          type="text"
          placeholder="https://"
          className="border px-3 py-2 rounded w-full"
          value={formik.values.socialMediaURL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.socialMediaURL && formik.errors.socialMediaURL && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.socialMediaURL}</div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Continue
      </button>
    </form>
  );
};
