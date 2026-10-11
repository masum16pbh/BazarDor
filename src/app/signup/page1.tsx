"use client"
import React, { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { authClient, signIn, signUp } from "@/src/lib/auth-client";
import { date } from "better-auth";

export default function SineUP() {
  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();//to stop relode or submit currently for executing below

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof name !== "string"
    ) {
      return;
    }

    const { data: resData, error } = await signUp.email({ name, email, password })
    console.log(resData)

  };

  const handelSigninWithGoogle = async()=>{
    const res = await signIn.social(
      {
        provider: "google"
      }
    )
  }
  const [visible, setVisible] = useState(false)
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // clear error as user types
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };
   const [errors, setErrors] = useState<Record<string, string>>({});
    const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
   const validate = () => {
    const next: Record<string, string> = {};

    if (values.name.length < 3) {
      next.name = "Name must be at least 3 characters";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      next.email = "Please enter a valid email address";
    }

    if (values.password.length < 8) {
      next.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(values.password)) {
      next.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(values.password)) {
      next.password = "Password must contain at least one number";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return (

    <>
          <Form
      data-custom="foo"
      onSubmit={onSubmit}
      // onReset={onReset}
      className="flex flex-col gap-4 mx-auto my-auto bg-white p-3 rounded-2xl shadow-sm w-full max-w-md"
    >
        <label>Name</label>
        <input type="text" 
        required
        minLength={3}
        placeholder="Md Masum"
        />
        <label>Password</label>
        <input
          name="password"
            type={visible ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            placeholder="········"
            required
            minLength={8}
        />
          {/* <InputGroup className="flex w-full items-center">
            <InputGroup.Input
              className="w-full border rounded-2xl"
              type={visible ? "text" : "password"}

            ></InputGroup.Input>
            <InputGroup.Suffix className="pe-0 flex items-center justify-center"> */}
              <button
                
                aria-label={visible ? "Hide password" : "Show password"}
              
                onClick={() => setVisible(!visible)}
              >
                {visible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
              </button>
            
          <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
          
        <div className="flex gap-2">
          <Button type="submit">

            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
      <p>OR</p>
      <Button onClick={handelSigninWithGoogle}>Signin with google</Button>
    </>
  )
}