"use client";

import { Dispatch, SetStateAction } from "react";
import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const PasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password is required"),

});

const SecondStep = (props: { setStep: Dispatch<SetStateAction<number>> }) => {
  const { setStep } = props;
  const router = useRouter();
  const previousPage = () => {
    setStep(1);
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={PasswordSchema}
      onSubmit={(values) => {
        console.log(values);
        router.push("/create-profile");
      }}
    >
      {({ errors }) => (
        <Form className="w-2/5 h-1/4 flex flex-col gap-6">
          <div className="border w-fit rounded-8" onClick={previousPage}>
            <ChevronLeft />
          </div>
          <div>
            <h3 className="text-black text-lg">Welcome</h3>
            <p>Connect email and set a password</p>
          </div>
          <div>
            <Field
              placeholder="Enter email here"
              name="email"
              className="border rounded-xl p-2 w-full"
            />
            {errors.email ? (
              <div className="text-red-500">{errors.email}</div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <Field
              placeholder="Enter password here"
              name="password"
              className="border rounded-xl p-2 w-full"
              type="password"
            />
            {errors.password ? (
              <div className="text-red-500">{errors.password}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex gap-2">
            <Checkbox />
            <p>Show password</p>
          </div>
          <Button className="bg-gray-400" type="submit">
            Contninue
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default SecondStep;
