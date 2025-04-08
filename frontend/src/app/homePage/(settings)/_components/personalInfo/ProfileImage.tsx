"use client";
import { useState } from "react";

type ProfileImageProps = {
  onImageChange: (url: string) => void;
};

const ProfileImage = ({ onImageChange }: ProfileImageProps) => {
  const [image, setImage] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      setImage(newImageUrl);
      onImageChange(newImageUrl);
    }
  };

  return (
    <div className="flex flex-col gap-[5px] w-full h-auto  ">
      <label htmlFor="foodImage">Profile image</label>
      <input
        id="profileImage"
        accept="image/*"
        type="file"
        className="w-[160px] h-[160px] cursor-pointer rounded-full opacity-0 absolute z-10 "
        onChange={onChange}
      />
      <div className="w-[160px]  h-[160px] relative rounded-full flex bg-[#2563EB0D] justify-center items-center border-2 border-[#2563EB33] border-dashed">
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="w-full cursor-pointer absolute h-full rounded-full object-cover "
          />
        ) : (
          <p>Choose a file or drag & drop it here</p>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
