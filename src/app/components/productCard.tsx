import Link from "next/link";
import { I_Item } from "../type"
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineLine } from "react-icons/ai";
export default function ItemCard(product: I_Item) {
    let unitBn = ''
    switch (product.unit) {
        case "kg":
            unitBn = "প্রতি কেজি"
            break
        case "litre":
            unitBn = "প্রতি লিটার"
            break
        case "dozen":
            unitBn = "প্রতি ডজন"
            break
        case "piece":
            unitBn = "প্রতি পিস"
            break
        default:
            unitBn = ""
    }
    
 function Change(){
        const pctBn= Math.abs(Number(product.change.pct)).toLocaleString("bn")
        if(product.change.dir==="up"){
            return(
                <div className="flex items-center text-red-600"><AiOutlineCaretUp/> {pctBn} %</div>
            )
        }
        else if(product.change.dir==="down"){
            return(
                <div className="flex items-center text-green-500"><AiOutlineCaretDown/> {pctBn} %</div>
            )
        }
        else{
            return(
                <div className="flex items-center"><AiOutlineLine/>{pctBn}%</div>
            )
        }
    }
    return (
        <>
        <Link href={`/details/${product.id}`}>
            <div className="w-full border border-[#E1E8E1] bg-white rounded-2xl p-2">
                <div className="flex gap-2 items-center">
                    <div className="text-center bg-[#F0F5F0] rounded-xl w-12 h-12 items-center text-4xl">
                        {product.image}
                    </div>
                    <div>
                        <h2 className="font-bold ">{product.nameBn}</h2>
                        <p>{unitBn}</p>
                    </div>
                </div>
                <div>
                    <p>আজকের দাম</p>
                    <div className="flex justify-between">
                        <div className="flex gap-1">
                            <h2 className="font-bold text-2xl">{product.today.toLocaleString("bn")}</h2>
                            <p> টাকা</p>
                        </div>
                        <div className="bg-[#F0F5F0] px-2 rounded-xl">
                            <Change></Change>

                        </div>
                    </div>
                </div>
            </div>
            </Link>
        </>
    )
}