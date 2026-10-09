import { Suspense } from "react";
import CatagoryDesigin from "./catagory";

export default async function catagoryPage({params}:{params:Promise<{cata_slag:string}>}){

   
    return(
        <Suspense fallback=" ... ">
<CatagoryDesigin paramsPromise={params}></CatagoryDesigin>
        </Suspense>
    )

}