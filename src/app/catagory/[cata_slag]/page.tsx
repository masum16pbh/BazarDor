import { Suspense } from "react";
import CatagoryDesigin from "./catagory";

export default async function catagoryPage({params}:{params:{cata_slag:string}}){

    return(
        <Suspense fallback=" ... ">
<CatagoryDesigin params={params}></CatagoryDesigin>
        </Suspense>
    )

}