import InputField from "./InputField";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@/app/provider/UserProvider";
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password can’t be longer than 32 characters")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/\d/, "Must include a number")
    .matches(/[@$!%*?&]/, "Must include a special character")
    .required("Password is required"),
});

const ChangePassword = () => {
  const { getUser, userId } = useUser();
  console.log(userId);
  return (
    <Formik
      initialValues={{
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={PasswordSchema}
      onSubmit={async (values) => {
        const response = await axios.put(
          `http://localhost:8000/user/${userId}`,
          {
            password: values.newPassword,
          }
        );
        toast.success("✅ Your password have been changed successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        getUser();
        return response.data;
      }}
    >
      {({ values, handleSubmit, errors, touched, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="w-full p-6 h-auto border cursor-default rounded-lg flex flex-col gap-4">
            <h1 className="font-semibold">Set a new password</h1>

            <div className="flex flex-col gap-2">
              <div>
                <InputField
                  label="New pasword"
                  value={values.newPassword}
                  onChange={(value) => setFieldValue("newPassword", value)}
                />
                {errors.newPassword && touched.newPassword && (
                  <div className="text-[12px] text-red-500">
                    {errors.newPassword}
                  </div>
                )}
              </div>
              <div>
                <InputField
                  label="Confirm password"
                  value={values.confirmPassword}
                  onChange={(value) => setFieldValue("confirmPassword", value)}
                />
                {errors.newPassword && touched.newPassword && (
                  <div className="text-[12px] text-red-500">
                    {errors.newPassword}
                  </div>
                )}
              </div>
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
