import Link from "next/link";

interface Icatagory{
     id : string;
     slug : string;
     nameBn : string;
     icon : string;
}
export default async function Catagorys(){
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
    const cats:Icatagory[] = await res.json()
interface catagoryProps{
    cat: Icatagory;
}
    const Catagory=({cat}:catagoryProps)=>{
return(
    <>
   <Link href={`/catagory/${cat.slug}`}>
   {`${cat.icon} ${cat.nameBn}`}
   </Link>
    </>
)
    }
    return(
        <>
        <div className="flex gap-2 p-2">
            {cats.map(cat =><Catagory key={cat.id} cat={cat} ></Catagory>)}
        </div>
        </>
    )
}