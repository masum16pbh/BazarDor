"use client"
import React, { useState } from "react";
import {Eye, EyeSlash} from "@gravity-ui/icons";

import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { authClient, signUp } from "@/src/lib/auth-client";
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
     const [visible, setVisible] = useState(false)

  return (

    <>
      <Form
        className="flex w-96  flex-col gap-4 mx-auto my-auto bg-green-300 p-3 rounded-2xl"
        render={(props) => <form {...props} data-custom="foo" />}
        onSubmit={onSubmit}
      >
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label>Name</Label>
          <Input placeholder="Your name" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="your e-mail" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full "
              type={visible ? "text" : "password"}></InputGroup.Input>
            <InputGroup.Suffix className="pe-0">
              <Button
                // isIconOnly
                // aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setVisible(!visible)}
              >
                {visible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
          <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button type="submit">

            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </>
  )
}