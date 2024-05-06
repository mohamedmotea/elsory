import axios from "axios"
import { useQuery } from "react-query"
import { BeatLoader } from "react-spinners"
import logo from '../../assets/logo.jpg'
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
export default function Shop() {

  const {data,isLoading} = useQuery('shops',async()=>{
    return await axios.get('https://elsory-sweets.onrender.com/api/v1/shop?size=10')
    .then((res)=>res)
    .catch((err)=>err)
  },{
    cacheTime: 300000
  })
  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])
  return (
    <section>
          <Helmet>
      <title>المتاجر</title>
        </Helmet>
      <div className="container mx-auto py-5 px-2 md:px-10">
        <h3 className="font-bold text-xl border-b-2 w-fit pb-2 px-4 mx-auto">المتاجر</h3>

      {isLoading ? <section className="flex justify-center pt-16">
        <BeatLoader color="#F6F0D8"   margin={13}  size={50} />
      
      </section> : <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 md:gap-x-11 gap-y-10 my-10">
      {data?.data?.data.map((shop,index)=> <Link to={`/menu/${shop._id}`} key={index} className="border py-5 px-2 rounded bg-[--mainColor]">
        {shop.image.secure_url ? <img src={shop.image.secure_url} alt="logo" width={60} className="rounded-full mx-auto mb-5"/> : <img src={logo} width={60} height={60} className="rounded-full mx-auto mb-5"/> }
        <h2 className="font-bold text-center w-fit border-b-2 border-[#fff] pb-3 mx-auto">{shop.shop_name}</h2>
        <p className="text-sm mt-6">- {shop.location}</p>
        <div className="flex flex-col mt-3 md:mt-8 justify-center"dir="ltr">
        {shop.delivery_Number.map((num,i)=> <span key={i}>- {num}</span>)}

        </div>
        
        </Link>)}

    </div>}
      </div>
    </section>
  )
}
