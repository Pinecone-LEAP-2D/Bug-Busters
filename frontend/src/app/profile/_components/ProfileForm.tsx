"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Camera } from "lucide-react";
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  about: Yup.string().required("About is required"),
  socialUrl: Yup.string()
    .url("Enter a valid URL")
    .required("Social media URL is required"),
});
interface FormValues {
  name: string;
  about: string;
  socialUrl: string;
}

interface ProfileFormProps {
  setStep: (step: number) => void;
  step: number;
}
const ProfileForm: React.FC<ProfileFormProps> = ({ setStep }) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const initialValues: FormValues = {
    name: "",
    about: "",
    socialUrl: "",
  };
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // setPhoto(e.target.files[0]);
      const file = event?.target?.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setPhoto(url);
      };
      reader.readAsDataURL(file as Blob);
    }
  };
  const handleSubmit = (values: FormValues) => {
    console.log({ ...values, photo });
    setStep(2);
  };

  console.log(photo);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="w-[510px] border border-dashed border-blue-400 p-4 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Complete your profile page</h2>
        <div>
          <label className="block mb-1 font-medium">Add photo</label>
          <label
            htmlFor="hi"
            className="flex flex-col items-center justify-center gap-y-2 cursor-pointer bg-gray-100 w-32 h-32 border rounded-full border-dashed"
          >
            <div className="w-full">
              <div className="flex justify-center">
                <img src={photo} />
                <input
                  type="file"
                  hidden
                  id="hi"
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
          <Field
            name="name"
            type="text"
            placeholder="Enter your name here"
            className="border px-3 py-2 rounded w-full"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div>
          <Field
            name="about"
            as="textarea"
            placeholder="Write about yourself here"
            className="border px-3 py-2 rounded w-full h-20"
          />
          <ErrorMessage
            name="about"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div>
          <Field
            name="socialUrl"
            type="url"
            placeholder="https://"
            className="border px-3 py-2 rounded w-full"
          />
          <ErrorMessage
            name="socialUrl"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Continue
        </button>
      </Form>
    </Formik>
  );
};
export default ProfileForm;
