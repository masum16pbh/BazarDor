

import ItemCard from "../../components/productCard"
import { I_Item } from "../../type"
import Selection from "./sortSelect";

const getData = async (cata_slag: string) => {
    "use cache";
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${cata_slag}`)
    return res.json()
}

interface cataProms {
    cata_slag: string;

}
export default async function CatagoryDesigin({paramsPromise,}: {paramsPromise: Promise<{ cata_slag: string }>;}) {
    const { cata_slag } = await paramsPromise;

    const cata: I_Item[] = await getData(cata_slag)
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

                <Selection catagorys={cata} />
                

            </div>
        </>
    )

}