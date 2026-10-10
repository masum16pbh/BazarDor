import { I_Item } from "../type";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import ItemCard from "./productCard";

interface updownProps {
    products: I_Item[]
}
export default function UpDownSection({ products }: updownProps) {
    const up = products.filter(product => product.change.dir === 'up').sort((a, b) => b.change.pct - a.change.pct).slice(0, 6)
    const down = products.filter(product => product.change.dir === 'down').sort((a, b) => a.change.pct - b.change.pct).slice(6)

    return (
        <>
        <div className="flex flex-col gap-10 ">
            <div>
                <h2 className="flex gap-1"> <span className=" text-red-600"><AiOutlineCaretUp /></span> আজ দাম বেড়েছে</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {up.map(item => <ItemCard key={item.id} {...item}></ItemCard>)}
                </div>
            </div>
            <div>
                <h2 className="flex gap-1"><AiOutlineCaretDown className="text-green-500" />আজ দাম কমেছে</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {down.map(item => <ItemCard key={item.id} {...item}></ItemCard>)}
                </div>
            </div>
            </div>
        </>
    )
}