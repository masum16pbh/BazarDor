import { I_Item } from "../../type"
import Link from "next/link";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineLine } from "react-icons/ai";
interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}
interface IDetals extends I_Item {
    markets: Market[];
}
export default async function GET_paraam({ params }: { params: { pid: string } }) {
    const { pid } = await params
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${pid}`)
    if (!res) { return (<>Not found</>) }
    const product: IDetals = await res.json()
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
    let dirBN = ''
    switch (product.change.dir) {
        case "up":
            dirBN = 'বেড়েছে'
            break

        case "down":
            dirBN = "কমেছে"
            break
        default:
            dirBN = 'অপরিবর্তিত আছে'
    }
    const change = Math.abs(product.today - product.yesterday).toLocaleString("bn")
    const max_price = Math.max(...product.markets.map(mar => mar.max))
    const min_price = Math.min(...product.markets.map(mar => mar.min))
    const avg = Number(((max_price + min_price) / 2).toFixed(2))

    function Change() {
        const pctBn = Math.abs(Number(product.change.pct)).toLocaleString("bn")
        if (product.change.dir === "up") {
            return (
                <div className="flex items-center text-red-600"><AiOutlineCaretUp /> {pctBn} %</div>
            )
        }
        else if (product.change.dir === "down") {
            return (
                <div className="flex items-center text-green-500"><AiOutlineCaretDown /> {pctBn} %</div>
            )
        }
        else {
            return (
                <div className="flex items-center"><AiOutlineLine />{pctBn}%</div>
            )
        }
    }
    return (
        <>
            <div className="container mx-auto flex flex-col justify-around gap-5">
                <div className="flex gap-3">
                    <Link href='/'>Home</Link>
                    <Link href="" >{product.categoryNameBn}</Link>
                    <Link href=''>{product.nameBn}</Link>
                </div>

                <div className="flex p-2 items-center bg-white rounded-2xl border border-[rgb(128,133,128)]">
                    <div className="text-3xl p-2">{product.image}</div>
                    <div className="flex justify-between gap-1 w-full items-center">
                        <div>
                            <h2>{product.nameBn}</h2>
                            <p>{unitBn} {product.categoryNameBn}</p>
                            <p>গতকালের তুলনায় আজ দাম {dirBN} {change} টাকা</p>
                        </div>
                        <div>
                            <p>আজকের দাম</p>
                            <h2>{product.today.toLocaleString("bn")}</h2>
                            <p>টাকা/{unitBn}</p>
                            <Change />
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <h3>দামের সারসংক্ষেপ</h3>
                        <div className=" flex justify-between gap-2 w-full p-2">
                            <div>
                                <p>সর্বনিম্ন দাম</p>
                                <h2>{min_price.toLocaleString("bn")}</h2>
                                <p>সবচেয়ে কম দামের বাজার</p>
                            </div>
                            <div>
                                <p>সর্বাধিক দাম</p>
                                <h2>{max_price.toLocaleString("bn")}</h2>
                                <p>সবচেয়ে বেশি দামের বাজার</p>
                            </div>
                            <div>
                                <p>
                                    গড় দাম</p>
                                <h2>{avg.toLocaleString("bn")}</h2>
                                <p>{unitBn}-এর হিসাবে</p></div>
                        </div>
                    </div>
                    <div>
                        <h3>বাজারভিত্তিক আজকের দাম</h3>
                        <div className="flex">
                            <span className="flex-2">
                                বাজার</span>
                            <span className="flex-2">বিভাগ</span>
                            <span className="flex-1">সর্বনিম্ন</span>
                            <span className="flex-1">সর্বাধিক</span>
                            <span className="flex-1 text-right">গড়</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}