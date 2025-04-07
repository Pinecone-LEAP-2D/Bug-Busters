import InputField from "./InputField";
import { Formik } from "formik";

const ChangePassword = () => {
  return (
    <Formik
      initialValues={{
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={(values) => {
        console.log("successfully changed password", values);
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="w-full p-6 h-auto border cursor-default rounded-lg flex flex-col gap-4">
            <h1 className="font-semibold">Set a new password</h1>

            <div className="flex flex-col gap-2">
              <InputField
                label="New pasword"
                value={values.newPassword}
                onChange={(value) => setFieldValue("newPassword", value)}
              />

              <InputField
                label="Confirm password"
                value={values.confirmPassword}
                onChange={(value) => setFieldValue("confirmPassword", value)}
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

export default ChangePassword;
