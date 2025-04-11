"use client";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";

const SignupSchema = Yup.object().shape({
  userName: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
});

const FirstStep = (props: { setStep: Dispatch<SetStateAction<number>> }) => {
  const { setStep } = props;
  setStep(1);
  return (
    <Formik
      initialValues={{
        userName: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        setStep(2);
        localStorage.setItem("username", JSON.stringify(values.userName));
      }}
    >
      {({ errors }) => (
        <Form className="w-2/5 h-1/4 flex flex-col gap-6">
          <div>
            <h3 className="text-black text-lg">Create your account</h3>
            <p>Choose a username for your page </p>
          </div>
          <div>
            <Field
              placeholder="Enter user name here"
              name="userName"
              className="border rounded-xl p-2 w-full"
            />
            {errors.userName ? (
              <div className="text-red-500">{errors.userName}</div>
            ) : (
              <></>
            )}
          </div>
          <Button className="bg-gray-400" type="submit">
            continue
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default FirstStep;
