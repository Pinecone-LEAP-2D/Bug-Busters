"use client";

import { Formik } from "formik";
import CountrySelection from "@/app/homePage/(settings)/_components/paymentDetail/CountrySelection";
import ExpiryDateSelector from "@/app/homePage/(settings)/_components/paymentDetail/ExpiryDate";
import axios from "axios";
import { useUser } from "@/app/provider/UserProvider";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputField from "@/app/[username]/components/InputField";
import { useRouter } from "next/navigation";

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

const validationSchema = Yup.object({
  country: Yup.string().required("Country is required."),
  firstName: Yup.string()
    .required("First name is required.")
    .min(2, "First name must be at least 2 characters."),
  lastName: Yup.string()
    .required("Last name is required.")
    .min(2, "Last name must be at least 2 characters."),
  cardNumber: Yup.string()
    .required("Card number is required.")
    .matches(
      /^\d{4}-\d{4}-\d{4}-\d{4}$/,
      "Card number must be in format: 1234-1234-1234-1234"
    ),

  expiryDate: Yup.date().required("Expiry date is required.").nullable(),
  cvc: Yup.string()
    .required("CVC is required.")
    .matches(/^[0-9]{3}$/, "CVC must be 3 digits."),
});

const BankCard: React.FC<BankCardProps> = ({ setStep }) => {
  const handleBackButton = () => {
    setStep(1);
  };
  const { userId } = useUser();
  const router = useRouter();
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
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const formattedValues = {
            ...values,
            expiryDate: values.expiryDate
              ? values.expiryDate.toISOString()
              : "",
          };

          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/bankCard/${userId}`,

              formattedValues
            );
            router.push("/homePage");
            console.log("Bank card created successfuly", response.data);
            toast.success("✅ Profile creation complete — you’re all set!", {
              position: "top-right",
              autoClose: 5000,
            });
            return response.data;
          } catch (error) {
            console.log("error in creating bank card from front end", error);
          }
          console.log("payment detail created", formattedValues);
        }}
      >
        {({ values, handleSubmit, setFieldValue, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="w-full p-6 h-auto border cursor-default rounded-lg flex flex-col gap-4">
              <h1 className="font-semibold">Payment details</h1>
              <div className="flex flex-col gap-2">
                <CountrySelection
                  value={values.country}
                  onChange={(value) => setFieldValue("country", value)}
                />
                {errors.country && touched.country && (
                  <div className="text-[12px] text-red-500">
                    {errors.country}
                  </div>
                )}

                <div className="flex gap-4">
                  <div>
                    <InputField
                      label="First name"
                      value={values.firstName}
                      onChange={(value) => setFieldValue("firstName", value)}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="text-[12px] text-red-500">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div>
                    <InputField
                      label="Last name"
                      value={values.lastName}
                      onChange={(value) => setFieldValue("lastName", value)}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="text-[12px] text-red-500">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <InputField
                  type="cardNumber"
                  label="Enter card number"
                  value={values.cardNumber}
                  onChange={(value) => setFieldValue("cardNumber", value)}
                />
                {errors.cardNumber && touched.cardNumber && (
                  <div className="text-[12px] text-red-500">
                    {errors.cardNumber}
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <ExpiryDateSelector
                  value={values.expiryDate}
                  onChange={(value) => setFieldValue("expiryDate", value)}
                />
                {errors.expiryDate && touched.expiryDate && (
                  <div className="text-[14px] text-red-500">
                    {errors.expiryDate}
                  </div>
                )}
                <div className="w-1/2 h-auto">
                  <InputField
                    label="Cvc"
                    value={values.cvc}
                    onChange={(value) => setFieldValue("cvc", value)}
                  />
                  {errors.cvc && touched.cvc && (
                    <div className="text-[12px] text-red-500">{errors.cvc}</div>
                  )}
                </div>
              </div>
              <div className="w-full h-auto flex justify-between">
                <button
                  className="cursor-pointer w-1/3 text-[12px] x-4 py-2 flex items-center justify-center bg-black rounded-sm text-white"
                  onClick={handleBackButton}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="cursor-pointer w-1/3 text-[12px] x-4 py-2 flex items-center justify-center bg-black rounded-sm text-white"
                >
                  Save changes
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BankCard;
