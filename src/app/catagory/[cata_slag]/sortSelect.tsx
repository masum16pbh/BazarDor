"use client"

import { useState } from "react"
import ItemCard from "../../components/productCard"
import { I_Item } from "../../type"
interface cataProps {
    catagorys: I_Item[]
}
export default function Selection({ catagorys }: cataProps ) {
    const [sortArr,setSortArr] = useState<I_Item[]>(catagorys)
   
    const handelSort=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const order = e.target.value
        const copy =[... catagorys]
        if(order==="ab"){
            copy.sort((a,b)=>a.today-b.today)
        }
        else if(order==="ba"){
            copy.sort((a,b)=>b.today-a.today)
        }
        setSortArr(copy)
    }
    return (
        <>
            <div className=" text-right bg-white p-2 rounded-xl gap-2">
                <label className="px-1">সাজান</label>
                <select className="px-1" onChange={handelSort}>// move othre
                    <option value="default">ডিফল্ট</option>
                    <option value="ab">দাম: কম থেকে বেশি</option>
                    <option value="ba">দাম: বেশি থেকে কম</option>
                </select>
            </div>
            <div className="grid grid-cols-3 gap-2">
                    {sortArr.map(cat => <ItemCard key={cat.id} {...cat}></ItemCard>)}

                </div>
        </>
    )
}