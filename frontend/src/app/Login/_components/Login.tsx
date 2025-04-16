"use client";

import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/provider/UserProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const PasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const LoginFirst = () => {
  const router = useRouter();
  const [savedEmail, setSavedEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setSavedEmail(storedEmail);
    }
  }, []);

  return (
    <Formik
      initialValues={{
        email: savedEmail || "",
        password: "",
      }}
      enableReinitialize={true}
      validationSchema={PasswordSchema}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/logIn`,

            {
              email: values.email,
              password: values.password,
            }
          );
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", values.email);
          router.push("/homePage");
          toast.success("👋 Welcome back! You’ve logged in successfully.", {
            position: "top-right",
            autoClose: 5000,
          });
        } catch (error) {
          console.log("error in login:", error);
          toast.error(
            "😕 Oops! That didn’t work. Double-check your email and password."
          );
        }
      }}
    >
      {({ errors, values, setFieldValue }) => (
        <Form className="w-2/5 h-1/4 flex flex-col gap-6">
          <div>
            <h3 className="text-black text-lg">Welcome</h3>
            <p>Connect email and set a password</p>
          </div>
          <div>
            <Field
              placeholder="Enter email here"
              name="email"
              className="border rounded-xl p-2 w-full"
              value={values.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue("email", e.target.value)
              }
            />
            {errors.email ? (
              <div className="text-red-500">{errors.email}</div>
            ) : null}
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
            ) : null}
          </div>
          <div className="flex gap-2">
            <Checkbox />
            <p>Show password</p>
          </div>
          <Button className="bg-gray-400" type="submit">
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
};
