import { Suspense } from "react"
import GET_paraam from "./detalsCard"

export default async function ProductDetesPage({params}:{params:{pid:string}}){

    return(
        <Suspense fallback="Loding ..">

            <div><GET_paraam params={params}></GET_paraam></div>
        </Suspense>
    )
}

