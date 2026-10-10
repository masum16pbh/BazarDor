import Marquee from "react-fast-marquee";
import { I_Item } from "../type";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineLine } from "react-icons/ai"
import Link from "next/link";
export default async function MarqueeItem(){
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products/',{next:{revalidate:60}})
if(!res) return(<></>)
    const data = await res.json()
const products:I_Item[] = data

const MarkItem =(product:I_Item)=>{
     let unitBn = ''
        switch (product.unit) {
            case "kg":
                unitBn = "কেজি"
                break
            case "litre":
                unitBn = "লিটার"
                break
            case "dozen":
                unitBn = "ডজন"
                break
            case "piece":
                unitBn = "পিস"
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
        return(
            <>
            <Link href={`/details/${product.id}`}>
            <div className="flex hover:bg-orange-200 px-2 rounded-xl ">
                <p>{product.image}</p>
                <p>{product.nameBn}</p>
                <p>{product.today.toLocaleString('bn')} টাকা/{unitBn}</p>
                <Change></Change>
            </div>
            </Link>
            </>
        )

}
    return(
    <>
<Marquee pauseOnHover={true} speed={40}>
    {products.map(product=><MarkItem key={product.id}{...product}></MarkItem>)}
</Marquee>
    </>
)
}