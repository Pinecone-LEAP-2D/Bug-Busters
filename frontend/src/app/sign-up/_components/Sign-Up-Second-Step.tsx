"use client";

import { Dispatch, SetStateAction } from "react";
import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const PasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password can’t be longer than 32 characters")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/\d/, "Must include a number")
    .matches(/[@$!%*?&]/, "Must include a special character")
    .required("Password is required"),
});

const SecondStep = (props: { setStep: Dispatch<SetStateAction<number>> }) => {
  // const { createUser } = useUser();
  const { setStep } = props;
  const router = useRouter();
  const previousPage = () => {
    setStep(1);
  };
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  console.log("in step two", userName);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={PasswordSchema}
      onSubmit={async (values) => {
        try {
          console.log(values);
          const response = await axios.post(
            "http://localhost:8000/user/sign-up",
            {
              email: values.email,
              password: values.password,
              userName: userName,
            }
          );
          console.log("user created successfully", response);
          toast.success("🎉 Account created! Welcome aboard.", {
            position: "top-right",
            autoClose: 5000,
          });
          router.push("/");
          localStorage.removeItem("username");
        } catch (error) {
          console.error("Error creating user:", error);
        }
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
