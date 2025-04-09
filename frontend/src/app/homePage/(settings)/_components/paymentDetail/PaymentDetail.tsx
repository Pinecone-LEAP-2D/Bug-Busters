import { Formik } from "formik";
import CountrySelection from "./CountrySelection";
import InputField from "../InputField";
import ExpiryDateSelector from "./ExpiryDate";

const PaymentDetail = () => {
  return (
    <Formik
      initialValues={{
        country: "",
        firstName: "",
        lastName: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      }}
      onSubmit={(values) => {
        console.log("payment detail", values);
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="w-full p-6 h-auto border cursor-default rounded-lg flex flex-col gap-4">
            <h1 className="font-semibold">Payment details</h1>
            <div className="flex flex-col gap-2">
              <CountrySelection
                value={values.country}
                onChange={(value) => setFieldValue("country", value)}
              />
              <div className="flex gap-4">
                <InputField
                  label="First name"
                  value={values.firstName}
                  onChange={(value) => setFieldValue("firstName", value)}
                />

                <InputField
                  label="Last name"
                  value={values.lastName}
                  onChange={(value) => setFieldValue("lastName", value)}
                />
              </div>
              <InputField
                label="Enter card number"
                value={values.cardNumber}
                onChange={(value) => setFieldValue("cardNumber", value)}
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

export default PaymentDetail;
