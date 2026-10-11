"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
interface Icatagory{
     id : string;
     slug : string;
     nameBn : string;
     icon : string;
}
interface catagoryProps{
    cat: Icatagory;
}



export default function Catagory({cat}:catagoryProps){
    const params= useParams();
    const currentSlag = params.cata_slag;
    const isActive = currentSlag === cat.slug;

    return(
    <>
   <Link href={`/catagory/${cat.slug}`} 
   className={`p-2 ${isActive? 'text-orange-500 bg-green-300 rounded-xl' : 'text-gray-600'}`}
   >
   {`${cat.icon} ${cat.nameBn}`}
   </Link>
    </>
)
}