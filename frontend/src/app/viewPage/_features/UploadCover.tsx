"use client";

import { useRef, useState } from "react";
import { useProfile } from "@/app/provider/ProfileProvider";
import { Button } from "@/components/ui/button";
import { useAllProfiles } from "@/app/provider/AllProfileProvider";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const UploadCover = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { updateCoverPhoto } = useAllProfiles();
  const { profile } = useProfile();

  const UploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET as string);

    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        console.log("Uploaded to Cloudinary:", data.secure_url);
        updateCoverPhoto(data.secure_url);
      } else {
        console.error("Cloudinary upload failed", data);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[320px]">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {!profile?.backgroundImage ? (
        <div className="bg-[#F4F4F5] w-full h-full flex justify-center items-center relative group">
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Button className="z-10" onClick={UploadImage} disabled={loading}>
            {loading ? "Uploading..." : "Add a cover image"}
          </Button>
        </div>
      ) : (
        <div className="relative group w-full h-full">
          <img
            src={profile.backgroundImage}
            alt="User cover image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end items-end p-4">
            <Button
              variant="secondary"
              onClick={UploadImage}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Change cover"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
