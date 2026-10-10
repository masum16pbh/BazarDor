import Image from "next/image";
import { I_Item } from "./type";
import ItemCard from "./components/productCard";
import { notFound } from "next/navigation";
import Footer from "./components/footer";
import HeroBaner from "./components/hero";
import UpDownSection from "./components/updown";


export default async function Home() {
  const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products/', { cache: "no-store" })
  if (!res.ok) notFound()
  const data = await res.json()
  const products: I_Item[] = data

  return (
    <div>
      
      <div className="flex flex-col justify-center container mx-auto gap-13">
<HeroBaner></HeroBaner>
<UpDownSection products={products}></UpDownSection>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">সব পণ্য</h2>
          <p className="text-gray-500">মোট {products.length.toLocaleString('bn')}টি পণ্য দেখানো হচ্ছে</p>
          <div className="grid grid-cols-3 gap-2">
          {products.map(product => <ItemCard key={product.id} {...product} />)}
        </div>
        </div>
      </div>
     
    </div>
  );
}
