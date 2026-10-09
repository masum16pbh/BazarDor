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
    interface BazarProps {
        market: Market;
        ind: number;
    }
    function BazarWisePrice({ market, ind }: BazarProps) {
        const avg = Number(((market.max + market.min) / 2).toFixed(2));
        return (
            <>
                <div className={`flex ${ind % 2 ? "bg-white" : "bg-slate-300"}`}>
                    <span className="flex-2">{market.market}</span>
                    <span className="flex-2">{market.division}</span>
                    <span className="flex-1">{market.min.toLocaleString("bn")}</span>
                    <span className="flex-1">{market.max.toLocaleString("bn")}</span>
                    <span className="flex-1 text-right font-bold">{avg.toLocaleString("bn")}</span>
                </div>
            </>
        )

    }
    return (
        <>
            <div className="container mx-auto flex flex-col justify-around gap-5">
                <div className="flex gap-3">
                    <Link href='/'>Home</Link>
                    <Link href="" >{product.categoryNameBn}</Link>
                    <Link href=''>{product.nameBn}</Link>
                </div>

                <div className="flex p-2 items-center bg-white rounded-2xl border border-slate-400">
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
                    <div className="p-3 bg-white rounded-2xl">
                        <h3>দামের সারসংক্ষেপ</h3>
                        <div className=" flex justify-between gap-2 w-full p-2">
                            <div className="border border-slate-400 p-4 rounded-2xl w-full ">
                                <p>সর্বনিম্ন দাম</p>
                                <h2 className="text-green-500 text-3xl font-bold">{min_price.toLocaleString("bn")}</h2>
                                <p>সবচেয়ে কম দামের বাজার</p>
                            </div>
                            <div className="border border-slate-400 p-4 rounded-2xl w-full">
                                <p>সর্বাধিক দাম</p>
                                <h2 className="text-red-500 text-3xl font-bold">{max_price.toLocaleString("bn")}</h2>
                                <p>সবচেয়ে বেশি দামের বাজার</p>
                            </div>
                            <div className="border border-slate-400 p-4 rounded-2xl w-full ">
                                <p>
                                    গড় দাম</p>
                                <h2 className="text-green-500 text-3xl font-bold" >{avg.toLocaleString("bn")}</h2>
                                <p>{unitBn}-এর হিসাবে</p></div>
                        </div>
                    
                        <h3>বাজারভিত্তিক আজকের দাম</h3>
                        <div className="p-2 border border-slate-400 rounded-xl">
                            <div className="flex">
                                <span className="flex-2">
                                    বাজার</span>
                                <span className="flex-2">বিভাগ</span>
                                <span className="flex-1">সর্বনিম্ন</span>
                                <span className="flex-1">সর্বাধিক</span>
                                <span className="flex-1 text-right">গড়</span>
                            </div>
                            {product.markets.map((mar: Market, ind) => <BazarWisePrice key={ind} market={mar} ind={ind}></BazarWisePrice>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}