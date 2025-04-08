import InputField from "../InputField";
import { Formik } from "formik";
import ProfileImage from "./ProfileImage";
import TextArea from "../TextArea";

const PersonalInfo = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        socialMedia: "",
        about: "",
        image: "",
      }}
      onSubmit={(values) => {
        console.log("successfully added personal info", values);
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="w-full p-6 h-auto border rounded-lg flex flex-col gap-4 cursor-default">
            <h1 className="font-semibold">Personal info</h1>
            <ProfileImage
              onImageChange={(url) => setFieldValue("image", url)}
            />
            <div className="flex flex-col gap-2">
              <InputField
                label="Name"
                value={values.name}
                onChange={(value) => setFieldValue("name", value)}
              />

              <TextArea
                label="About"
                value={values.about}
                onChange={(value) => setFieldValue("about", value)}
              />

              <InputField
                label="Social media url"
                value={values.socialMedia}
                onChange={(value) => setFieldValue("socialMedia", value)}
              />
            </div>

            <button
              type="submit"
              className="w-full h-auto cursor-pointer text-[14px] x-4 py-2 flex items-center justify-center bg-black rounded-sm text-white"
            >
              Save changes
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default PersonalInfo;
