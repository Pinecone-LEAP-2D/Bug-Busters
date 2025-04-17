import { Formik } from "formik";
import TextArea from "./TextArea";
import InputField from "./InputField";
import CoffeeIcon from "@/app/assets/CoffeeIcon";
import { useUser } from "@/app/provider/UserProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import { useBankCard } from "@/app/provider/BankCardProvider";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  socialURLOrBuyMeCoffee: Yup.string()
    .required("Social media URL is required")
    .matches(
      /^https?:\/\/(www\.)?(facebook|twitter|instagram|linkedin|tiktok)\.com\/[A-Za-z0-9_.-]+\/?$/,
      "Must be a valid social media URL"
    ),

  specialMessage: Yup.string()
    .min(3, "Must be longer than 2 characters")
    .required("This field is required"),
});

const BuyCoffee = ({ donorId }: { donorId?: number }) => {
  const { userId } = useUser();
  const { bankCard } = useBankCard();
  console.log(bankCard);

  if (!donorId) return <></>;
  if (bankCard.length === 0)
    return (
      <div className="w-[625px] bg-white rounded-lg flex-col gap-2 flex items-center justify-center">
        <p> Please submit your bank card</p>
        <Link href={"/homePage"}>
          <button className="bg-blue-500 py-1.5 px-3 rounded-lg">
            Click me !
          </button>
        </Link>
      </div>
    );
  return (
    <Formik
      initialValues={{
        amount: 1,
        donorId: userId,
        socialURLOrBuyMeCoffee: "",
        recipientId: donorId,
        specialMessage: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          console.log(values);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/donation`,
            {
              ...values,
            }
          );
          toast.success("🌟 Thanks for buying me a coffee! You're awesome..", {
            position: "top-right",
            autoClose: 5000,
          });
        } catch (error) {
          console.log("error in create donor from front end", error);
        }
      }}
    >
      {({ values, handleSubmit, setFieldValue, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="p-6 rounded-lg  w-[625px] bg-white">
            <div>
              <h1 className="font-medium mb-6">Buy Space ranger a Coffee</h1>
              <div className="flex flex-col gap-2">
                <p>Select amount:</p>
                <div className="flex gap-4 mb-6">
                  {[1, 2, 5, 10].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setFieldValue("amount", amt)}
                      className={`px-4 py-2 cursor-pointer rounded-sm border flex gap-1 font-semibold transition
        ${
          values.amount === amt
            ? "bg-[#F4F4F5CC] text-black"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }
      `}
                    >
                      <CoffeeIcon />${amt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 ">
              <div>
                <InputField
                  label="Enter BuyMeCoffee or social acount URL:"
                  value={values.socialURLOrBuyMeCoffee}
                  onChange={(value) =>
                    setFieldValue("socialURLOrBuyMeCoffee", value)
                  }
                />
                {errors.socialURLOrBuyMeCoffee ? (
                  <p className="text-red-500 text-[12px]">
                    {errors.socialURLOrBuyMeCoffee}
                  </p>
                ) : null}
              </div>
              <div>
                <TextArea
                  label="Special message:"
                  value={values.specialMessage}
                  onChange={(value) => setFieldValue("specialMessage", value)}
                />
                {errors.specialMessage ? (
                  <p className="text-red-500 text-[12px]">
                    {errors.specialMessage}
                  </p>
                ) : null}
              </div>
            </div>
            <button
              className="w-full h-auto bg-black text-white py-2 mt-6 rounded-sm"
              type="submit"
            >
              Support
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default BuyCoffee;
