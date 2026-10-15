"use client"
import { updateUser, useSession } from "@/src/lib/auth-client"
    ;
import { FormEvent } from "react";
export default function Profile() {
    const { data: session, } = useSession();
    const handelUpdate = async (formData: FormData) => {
        const updatedName = formData.get("name") as string;
        updateUser({
            name: updatedName
        })
    }
    return (
        <>
            <div className="border mx-auto flex-col p-3 rounded-2xl">
                <div className="my-4"><h2 className="text-3xl text-center">আমার প্রোফাইল</h2>
                    <p>অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                </div>
                <div>

                    <div>
                        <h2>নাম: {session?.user.name}</h2>
                        <p>ইমেইল: {session?.user.email}</p>
                    </div>
                </div >
                
                <form action={handelUpdate} className="my-4 bg-blue-300 rounded-2xl p-2">
                <p>আপনার প্রোফাইল আপডেট করুন</p>

                    <div>
                        <h2>তথ্য</h2>
                        <hr />
                        <div className="flex gap-1 items-center my-2">
                            <p>নাম </p>
                            <input type="text"
                                name="name" className="bg-white p-0.5 rounded-sm"
                            />
                        </div>
                            <button type="submit" className="bg-green-500 px-1 rounded-sm ">আপডেট </button>
                    </div>
                </form>
            </div>
        </>
    )
}