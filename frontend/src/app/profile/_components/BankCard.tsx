"use client";
import { Formik } from "formik";
import CountrySelection from "@/app/homePage/(settings)/_components/paymentDetail/CountrySelection";
import InputField from "@/app/[userId]/components/InputField";

type BankCardProps = {
  setStep: (step: number) => void;
};

const BankCard: React.FC<BankCardProps> = ({ setStep }) => {
  const handleBackButton = () => {
    setStep(1);
  };
  return (
    <div>
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
          console.log("payment detail created", values);
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="w-[510px] p-6 h-auto border cursor-default rounded-lg flex flex-col gap-4">
              <div>
                <h1 className="font-semibold text-[24px]">
                  How would you like to be paid ?
                </h1>
                <p className="text-[#71717A]">
                  Enter location and payment details
                </p>
              </div>

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
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save changes
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BankCard;
