"use client"
import React, { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { LiaGithub } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/src/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import Link from "next/link";


export default function SignInPage() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackURL') || '/';
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get("email");
        const password = formData.get("password");

        if (typeof email !== "string" || typeof password !== "string") {
            return;
        }

        const result = await signIn.email({
            email, password, rememberMe: true,
            callbackURL: callbackUrl,
        });

        if (result.error) {
            console.error(result.error);
        }
        console.log(result.data)
    };
    const handelGoogleSignin = async () => {
        const data = await signIn.social({
            provider: "google",
            callbackURL: callbackUrl
        })
    };
    const handleGithubSignin = async () => {
        const data = await signIn.social({
            provider: "github",
            callbackURL: callbackUrl
        })
    };
    const [visible, setVisible] = useState(false)
    return (

        <>
            <div className="my-auto text-center flex flex-col gap-4">
                <h1 className="text-3xl">সাইন ইন</h1>
                <p>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
                <Form
                    className="flex w-96  flex-col gap-4 mx-auto text-left bg-white p-3 rounded-2xl"
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
                        <Label>ইমেইল</Label><br />
                        <Input placeholder="your e-mail" className="px-2 w-full border rounded-[4] border-gray-300" />
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
                        <Label>পাসওয়ার্ড</Label>
                        <InputGroup aria-label="password section " className="flex gap-2 px-2 border rounded-[4] border-gray-300">
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
                        <Description>অবশ্যই অন্তত ৮টি অক্ষরের হতে হবে, যার মধ্যে একটি বড় হাতের অক্ষর ও একটি সংখ্যা থাকতে হবে।</Description>
                        <FieldError />
                    </TextField>
                    <div className="text-center bg-green-500 p-2 rounded-2xl">
                        <Button type="submit" aria-label="Submit">
                            সাইন ইন
                        </Button>

                    </div>
                    <div className="flex items-center">
                        <hr className="flex-1" />
                        <p>অথবা</p>
                        <hr className="flex-1" />
                    </div>
                    <div className="flex gap-2 justify-center">
                        <p onClick={handelGoogleSignin} className="flex text-xs gap-1 border border-slate-500 p-3 rounded-2xl"> <FcGoogle /> Google দিয়ে চালিয়ে যান</p>
                        <p onClick={handleGithubSignin} className="flex text-xs gap-1 border border-slate-500 p-3 rounded-2xl"> <LiaGithub /> GitHub দিয়ে চালিয়ে যান</p>
                    </div>
                    <div className="flex gap-1 justify-center">

                        <p>অ্যাকাউন্ট নেই? </p>
                        <Link href="/signup" className="text-green-500 underline"> সাইন আপ করুন</Link>
                    </div>
                </Form>
                <Link href="/">← হোম পেজে ফিরে যান</Link>
            </div>
        </>
    )
}