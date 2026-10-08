import Image from "next/image";
import { I_Item } from "./type";
import ItemCard from "./components/productCard";
import { notFound } from "next/navigation";

export default async function Home() {
  const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products/',{cache:"no-store"})
  if(!res.ok) notFound()
  const data = await res.json()
  const products:I_Item[] = data

  return (
    <div className="flex flex-col justify-center container mx-auto ">
      
      <div className="grid grid-cols-3 gap-2">
        {products.map(product =><ItemCard key={product.id} {...product} />)}
      </div>
    </div>
  );
}
