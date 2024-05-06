import axios from "axios"
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
export default function Menu() {
  const {shopId = ""} = useParams()
  const {data,isLoading} = useQuery('menus',async()=>{
    return await axios.get(`https://elsory-sweets.onrender.com/api/v1/menu/${shopId}`)
    .then((res)=>res)
    .catch((err)=>err)
  },{
    cacheTime: 5000000,
    keepPreviousData: true
  })

  return <>
  <section>
    <div className="container mx-auto">
    <h3 className="font-bold text-xl border-b-2 border-[--textColor] w-fit pb-2 px-4 mx-auto"> المنيو </h3>
    {isLoading ? <section className="flex justify-center pt-16 flex-wrap">
      <BeatLoader color="#6f3c2e"   margin={13}  size={50} />
    </section> : shopId !="" ?  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 md:gap-x-11 gap-y-10 my-10 px-10 mx-auto">{data?.data?.data?.image?.map((img,index)=> <Link target="_blank" to={img.secure_url} key={index}>
      <img src={img.secure_url} width={400} className="h-[200px] mx-auto sm:h-[350px] rounded"/>
       </Link>
      )} </div> : <div className="">{data?.data?.data?.map((item,index)=> <div key={index} className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 md:gap-x-11 gap-y-10 my-10 px-10 mx-auto">
    { item ? item?.image?.map((img,i)=> <Link key={i} to={img.secure_url} target="_blank">
        <img src={img.secure_url} width={400} className="h-[200px] mx-auto sm:h-[350px] rounded"/>
      </Link>):""}
       </div>
      )} </div>}
  
    </div>
  </section>
  </>
}
