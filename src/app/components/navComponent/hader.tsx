import Image from "next/image";
import logo from "../../../public/logo-icon.png"
import Link from "next/link";
import { Suspense } from "react";
import Catagorys from "../catagory";
import MarqueeItem from "../Marque";
import NavUserSection from "./userSecNab";
export const date = new Date().toLocaleString("bn-BD", { dateStyle: "full" })
export default function Hader() {

    return (
        <><div>
            <div className="container mx-auto">
                <div className=" flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Image src={logo} alt="basket logo" width={50} className="bg-green-300 p-2 rounded-xl"></Image>
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
                        <NavUserSection></NavUserSection>
                        </div>
                </div>
                <div className=" flex gap-1.5 items-center">
                    <Link href={`/`}>মূল পাতা</Link>
                    <Suspense fallback={<><div className="bg-white w-full"></div></>}>

                        <Catagorys></Catagorys>
                    </Suspense>
                </div>

            </div>
            <div className="my-2">
                <Suspense><MarqueeItem /></Suspense>
            </div>
        </div>
        </>
    )
}