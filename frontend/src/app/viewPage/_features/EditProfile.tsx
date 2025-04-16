"use client";

import { useProfile } from "@/app/provider/ProfileProvider";
import { Button } from "@/components/ui/button";
import { ProfileSchema } from "@/schema/profile";
import { EditProfileType, ProfileType } from "@/type";
import { updateProfile } from "@/utils/profileRequest";
import { useFormik } from "formik";
import { Heart } from "lucide-react";

export const EditProfile = (props: EditProfileType) => {
  const { profile, isLoading, refetch } = useProfile();

  if (!profile || isLoading) {
    return <>Loading</>;
  }
  return <ProfileContent {...props} profile={profile} refetch={refetch} />;
};

const ProfileContent = (
  props: EditProfileType & {
    profile: ProfileType;
    refetch: () => Promise<unknown>;
  }
) => {
  const { userId, setIsEditing, profile, refetch } = props;

  const handleSubmit = async (values: ProfileType) => {
    const fetchProfile = await updateProfile(values);
    await refetch();

    setIsEditing(false);
  };

  const formik = useFormik({
    initialValues: {
      ...(profile || ({} as ProfileType)),
      userId: userId,
    },
    validationSchema: ProfileSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-white flex flex-col gap-5 w-1/2 h-fit shadow">
        <div className="flex flex-col gap-3 border p-6 rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={formik.values.avatarImage}
                alt="avatar image"
                className="w-[48px] h-[48px] rounded-full"
              />
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="font-bold text-xl border rounded p-1"
              />
            </div>
            <Button type="submit">Save changes</Button>
          </div>
          <div className="border my-4"></div>
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold leading-6">
              About {formik.values.name}
            </p>
            <textarea
              name="about"
              onChange={formik.handleChange}
              value={formik.values.about}
              className="text-sm font-normal leading-5 border p-2 rounded resize-none"
              rows={3}
            />
          </div>
        </div>
        <div className="flex flex-col p-6 gap-3 border rounded-lg">
          <p className="font-semibold leading-6 text-base">Social Media URL</p>
          <input
            type="url"
            name="socialMediaURL"
            onChange={formik.handleChange}
            value={formik.values.socialMediaURL}
            className="text-sm font-normal leading-5 border p-2 rounded"
          />
        </div>
        <div className="flex flex-col p-6 border rounded-lg gap-3">
          <p className="font-semibold leading-6 text-base">Recent Supporters</p>
          <div className="border rounded-lg flex flex-col h-[150px] justify-center items-center gap-1">
            <Heart />
            <p className="font-semibold">
              Be the first one to support {formik.values.name}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
