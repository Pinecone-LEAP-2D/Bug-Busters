import { Formik } from "formik";
import TextArea from "./TextArea";
import InputField from "./InputField";
import CoffeeIcon from "@/app/assets/CoffeeIcon";

const BuyCoffee = () => {
  return (
    <Formik
      initialValues={{
        socialMediaUrl: "",
        specialMessage: "",
        amount: 1,
      }}
      onSubmit={(values) => {
        console.log("confirmation message", values);
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
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
              <InputField
                label="Enter BuyMeCoffee or social acount URL:"
                value={values.socialMediaUrl}
                onChange={(value) => setFieldValue("socialMediaUrl", value)}
              />
              <TextArea
                label="Special message:"
                value={values.specialMessage}
                onChange={(value) => setFieldValue("specialMessage", value)}
              />
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
