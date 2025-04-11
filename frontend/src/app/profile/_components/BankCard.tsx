"use client";

import { Formik } from "formik";
import CountrySelection from "@/app/homePage/(settings)/_components/paymentDetail/CountrySelection";
import InputField from "@/app/[userId]/components/InputField";
import ExpiryDateSelector from "@/app/homePage/(settings)/_components/paymentDetail/ExpiryDate";
import axios from "axios";
import { useUser } from "@/app/provider/UserProvider";

type BankCardProps = {
  setStep: (step: number) => void;
};

type PaymentFormValues = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: Date | null;
  cvc: string;
};

const BankCard: React.FC<BankCardProps> = ({ setStep }) => {
  const handleBackButton = () => {
    setStep(1);
  };
  const { userId } = useUser();
  return (
    <div>
      <Formik<PaymentFormValues>
        initialValues={{
          country: "",
          firstName: "",
          lastName: "",
          cardNumber: "",
          expiryDate: null,
          cvc: "",
        }}
        onSubmit={async (values) => {
          const formattedValues = {
            ...values,
            expiryDate: values.expiryDate
              ? values.expiryDate.toISOString()
              : "",
          };

          try {
            const response = await axios.post(
              `http://localhost:8000/bankCard/${userId}`,
              formattedValues
            );
            console.log("Bank card created successfuly", response.data);
            return response.data;
          } catch (error) {
            console.log("error in creating bank card from front end", error);
          }
          console.log("payment detail created", formattedValues);
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
              <div className="flex items-center gap-4">
                <ExpiryDateSelector
                  value={values.expiryDate}
                  onChange={(value) => setFieldValue("expiryDate", value)}
                />
                <div className="w-1/2">
                  <InputField
                    label="Cvc"
                    value={values.cvc}
                    onChange={(value) => setFieldValue("cvc", value)}
                  />
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
    </div>
  );
};

export default BankCard;
