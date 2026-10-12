 const date = new Date().toLocaleString("bn-BD", { dateStyle: "full" })
 export default function Today (){
    return(
        <>{date}</>
    )
 }