import * as Yup from "yup";

export const ProfileSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  about: Yup.string().required("About is required"),
  socialMediaURL: Yup.string()
    .url("Enter a valid URL")
    .required("Social media URL is required"),
});