import Image from "next/image";
import Link from "next/link";
import heroImg from "../../public/bazar-hero.png"
import { Suspense } from "react";
import { date } from "./hader";
export default function HeroBaner(){

    return(
        <>
       <div className="flex justify-between bg-white p-2 rounded-2xl">
         <div className="flex flex-col justify-between gap-4 ">
            <p className="text-green-400 p-1 px-2 bg-green-200 rounded-2xl w-fit">
                <Suspense fallback="To day is">{date}</Suspense>
            </p>
            <h1 className="text-4xl font-bold">আজকের বাজারের দাম এক নজরে</h1>
            <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
            <Link href={'/'} className="bg-green-400 text-white p-4 rounded-2xl w-fit font-bold">সব পণ্য দেখুন</Link>
        </div>
        <div>
            <Image src={heroImg} alt="some frute in a busket" ></Image>
        </div>
       </div>
        </>
    )
}