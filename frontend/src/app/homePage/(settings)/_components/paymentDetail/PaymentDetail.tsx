import { Formik } from "formik";
import CountrySelection from "./CountrySelection";
import InputField from "../InputField";
import ExpiryDateSelector from "./ExpiryDate";
import { useBankCard } from "@/app/provider/BankCardProvider";
import axios from "axios";
import { useUser } from "@/app/provider/UserProvider";
import { toast } from "react-toastify";

type PaymentFormValues = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: Date | null;
  cvc: string;
};

const PaymentDetail = () => {
  const { bankCard, getData } = useBankCard();
  const card = bankCard[0];
  const { userId } = useUser();

  return (
    <Formik<PaymentFormValues>
      initialValues={{
        country: card?.country ?? "",
        firstName: card?.firstName ?? "",
        lastName: card?.lastName ?? "",
        cardNumber: card?.cardNumber ?? "",
        expiryDate: card?.expiryDate ? new Date(card.expiryDate) : null,
        cvc: card?.cvc ?? "",
      }}
      onSubmit={async (values) => {
        const formattedValues = {
          ...values,
          expiryDate: values.expiryDate ? values.expiryDate.toISOString() : "",
        };
        try {
          const response = await axios.put(
            `http://localhost:8001/bankCard/${userId}`,
            formattedValues
          );
          getData();
          toast.success(
            "✅ Your bank card details have been updated successfully!",
            {
              position: "top-right",
              autoClose: 5000,
            }
          );
          console.log("Bank card updated successfuly", response.data);
          return response.data;
        } catch (error) {
          console.log("error in updating bank card from front end", error);
        }
        console.log("payment detail created", formattedValues);

        console.log("payment detail", formattedValues);
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
                type="password"
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
                  type="password"
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
  );
};

export default PaymentDetail;
