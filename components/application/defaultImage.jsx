import Image from "next/image"

export const DefaultImage = ()=>{
    return(
        <>
            <Image src={'/assets/Logo.jpeg'} width={200} height={400} className=""/>
        </>
    )
}