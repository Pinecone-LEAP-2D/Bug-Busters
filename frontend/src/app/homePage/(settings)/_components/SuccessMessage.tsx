import InputField from "./InputField";
import { Formik } from "formik";
import TextArea from "./TextArea";

const SuccessMessage = () => {
  return (
    <Formik
      initialValues={{
        confirmationMessage: "",
      }}
      onSubmit={(values) => {
        console.log("confirmation message", values);
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="w-full p-6 h-auto border cursor-default rounded-lg flex flex-col gap-4">
            <h1 className="font-semibold">Success page</h1>

            <div className="flex flex-col gap-2">
              <TextArea
                label="Confirmation message"
                value={values.confirmationMessage}
                onChange={(value) =>
                  setFieldValue("confirmationMessage", value)
                }
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

export default SuccessMessage;
