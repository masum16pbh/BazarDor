
import ItemCard from "../../components/productCard"
import { I_Item } from "../../type"
export default async function CatagoryDesigin({ params }: { params: { cata_slag: string } }) {
    const { cata_slag } = await params
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${cata_slag}`)
    if (!res) return (<></>)
    const cata: I_Item[] = await res.json()
    const { categoryIcon, categoryNameBn } = cata[0]
    const count = cata.length
    return (
        <>
            <div className="flex flex-col justify-center container mx-auto gap-3">
                <div className="flex bg-white p-2 rounded-xl items-center ">
                    <div className=" w-12 text-center text-3xl">
                        {categoryIcon}
                    </div>
                    <div>
                        <section>{categoryNameBn}</section>
                        <section>{count.toLocaleString('bn')} টি পণ্যের আজকের দাম ও পরিবর্তন</section>
                    </div>
                </div>

                <div className=" text-right bg-white p-2 rounded-xl gap-2">
                    <label className="px-1">সাজান</label>
                    <select className="px-1">
                        <option value="">ডিফল্ট</option>
                        <option value="">দাম: কম থেকে বেশি</option>
                        <option value="">দাম: বেশি থেকে কম</option>
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {cata.map(cat => <ItemCard key={cat.id} {...cat}></ItemCard>)}

                </div>

            </div>
        </>
    )

}