
import Link from "next/link";
import Catagory from "./LinkingCatagoy";

interface Icatagory{
     id : string;
     slug : string;
     nameBn : string;
     icon : string;
}
const getData=async ()=>{
const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories',{cache:'default'})
return res.json()
}
export default async function Catagorys(){
    
    const cats:Icatagory[] = await getData()
interface catagoryProps{
    cat: Icatagory;
}

    
    return(
        <>
        <div className="flex gap-2 p-2">
            {cats.map(cat =><Catagory key={cat.id} cat={cat} ></Catagory>)}
        </div>
        </>
    )
}