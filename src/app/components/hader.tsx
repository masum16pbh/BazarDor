import Image from "next/image";
import logo from "../../public/logo-icon.png"
import Link from "next/link";
import { Suspense } from "react";
import Catagorys from "./catagory";
const date = new Date().toLocaleString("bn-BD", { dateStyle: "full" })
export default function Hader() {

    return (
        <>
            <div className="container mx-auto">
                <div className=" flex justify-between items-center">
                    <div className="flex items-center">
                        <Image src={logo} alt="basket logo" width={50} className="bg-green-300 p-2"></Image>
                        <div>
                            <h2>বাজার দর</h2>
                            <p>
                                <Suspense fallback="  ">
                                    {date}


                                </Suspense>
                            </p>
                        </div>
                    </div>
                    <div>
                        <Link href={`/`} className="px-2 w-10 bg-white rounded-xl mx-1">সাইন ইন</Link>
                        <Link href={`/`} className="px-2 w-10 rounded-xl bg-green-500">সাইন আপ</Link>
                    </div>
                </div>
                <div className=" flex gap-1.5 items-center">
                    <Link href={`/`}>মূল পাতা</Link>
                    <Suspense fallback={<><div className="bg-white w-full"></div></>}>

<Catagorys></Catagorys>
                    </Suspense>
                </div>

            </div>
        </>
    )
}