"use client"

import {Eye, EyeSlash} from "@gravity-ui/icons";
import { signIn } from "@/src/lib/auth-client";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";

export default function SignInPage() {
    const onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get("email");
        const password = formData.get("password");

        if (typeof email !== "string" || typeof password !== "string") {
            return;
        }

        const result = await signIn.email({
            email, password, rememberMe: true,
            callbackURL: "/"
        });

        if (result.error) {
            console.error(result.error);
        }
        console.log(result.data)
    };
    const [visible, setVisible] = useState(false)
    return (

        <>
            <div className="my-auto">
                <Form
                    className="flex w-96  flex-col gap-4 mx-auto  bg-green-300 p-3 rounded-2xl"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >

                    <TextField
                        isRequired
                        aria-label="Name sectin give your name"
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
                        // type={visible? "text":"password"}
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
                        <InputGroup aria-label="password section">
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
                        <Button type="submit" aria-label="Submit">

                            Submit
                        </Button>
                        <Button type="reset" variant="secondary" aria-label="reset">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}