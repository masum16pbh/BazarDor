import { I_Item } from "../type"
export default function ItemCard(product: I_Item) {


    return (
        <>
            <div className="w-full border border-white rounded-2xl">
                <div>
                    <div className="text-center bg-[#F0F5F0] rounded-xl w-10 h-10 items-center text-2xl">
                        {product.categoryIcon}
                    </div>
                </div>
            </div>
        </>
    )
}