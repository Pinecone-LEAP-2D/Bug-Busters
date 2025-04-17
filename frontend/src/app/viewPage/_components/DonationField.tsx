"use client"; // For App Router, ignore if using Pages Router

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

const DonationSchema = Yup.object().shape({
  amount: Yup.number().oneOf([1, 2, 5, 10], "Invalid amount").required(),

  url: Yup.string()

    .url("Enter a valid URL")

    .required("URL is required"),

  message: Yup.string().max(200, "Message is too long"),
});

const amountOptions = [1, 2, 5, 10];

export default function DonationForm() {
  return (
    <div className="w-1/2 bg-white p-6 rounded-2xl shadow border border-gray-100 ">
      <h2 className="text-xl font-semibold mb-4">Buy Jake a Coffee</h2>
      <Formik
        initialValues={{ amount: 5, url: "", message: "" }}
        validationSchema={DonationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Submitted values:", values);

          alert("Thanks for your support!");

          resetForm();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <label className="block mb-2 font-medium">Select amount:</label>
            <div className="flex gap-4 mb-4">
              {amountOptions.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFieldValue("amount", val)}
                  className={`px-4 py-2 border rounded ${
                    values.amount === val ? "border-black" : "bg-gray-100"
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
            <ErrorMessage
              name="amount"
              component="div"
              className="text-red-500 text-sm mb-2"
            />
            <label className="block mb-2 font-medium">
              Enter BuyMeCoffee or social account URL:
            </label>
            <Field
              name="url"
              type="text"
              className="w-full mb-2 px-3 py-2 border rounded"
              placeholder="https://buymecoffee.com/jake"
            />
            <ErrorMessage
              name="url"
              component="div"
              className="text-red-500 text-sm mb-2"
            />
            <label className="block mb-2 font-medium">Special message:</label>
            <Field
              as="textarea"
              name="message"
              className="w-full mb-4 px-3 py-2 border rounded"
              placeholder="Please write your message here"
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-red-500 text-sm mb-4"
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
            >
              Support
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
