"use client";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const SignupSchema = Yup.object().shape({
  userName: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
});

const FirstStep = (props: { setStep: Dispatch<SetStateAction<number>> }) => {
  const { setStep } = props;
  const raw = localStorage.getItem("username");
  const [localName, setLocalName] = useState("");

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  useEffect(() => {
    setLocalName(raw || "");
  }, []);

  console.log(raw);

  return (
    <Formik
      initialValues={{
        userName: localName || "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        setStep(2);

        if (values.userName && values.userName.trim().length > 0) {
          const name = values.userName.trim();
          const formatted = name[0].toUpperCase() + name.slice(1).toLowerCase();

          localStorage.setItem("username", formatted);
          setLocalName(formatted);
        }
      }}
    >
      {({ errors, values }) => (
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
            {typeof errors.userName === "string" && (
              <div className="text-red-500">{errors.userName}</div>
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
