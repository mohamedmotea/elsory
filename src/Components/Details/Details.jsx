'use strict';
import { useParams } from "react-router-dom"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BeatLoader, ClipLoader, HashLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../Context/Cart";
import toast from "react-hot-toast";
import { TokenContext } from "../../Context/Token";
const settings = {
  dots: true,
  infinite: true,
  autoplay:true,
  speed: 500,
  autoplaySpeed:1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade:true,
  waitForAnimate: false,
  arrows:false
};
export default function Details() {
  const {addProductToCart} = useContext(CartContext)
  const [count,setCount]= useState(1);
  const [loading,setLoading] = useState(false);
  const [hover,setHover] = useState(null);
  const [rate,setRate] = useState(1);
  const [rating,setRating] = useState(false);
  const [rateSpinner , setRateSpinner] = useState(false)
  const {token} = useContext(TokenContext);
  const {id} = useParams();
  useEffect(()=>{
    if(count < 1){
      setCount(1)
    }
  },[count])
  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])


  const {data,isLoading,refetch} = useQuery('ProductDetails',async()=>{
    return await axios.get(`https://elsory-sweets.onrender.com/api/v1/product/${id}`)
  })

  const addToCart = async({productId,quantity})=>{
    if(!token) return toast.error('قم بتسجيل الدخول ')
    setLoading(true)
    const res = await addProductToCart({productId,quantity})
    if(res?.data?.message){
      toast.success(res.data?.message)
    }else if(res.response.data){
      toast.error(res.response.data.error)
    }
    setLoading(false)
    }
    async function addRateProduct(productId,rate){
      setRateSpinner(true)
       await axios.post(`https://elsory-sweets.onrender.com/api/v1/rate/${productId}`,{rate},{headers:{token}})
       .then((res)=> toast.success(res.data?.message))
       .catch((err)=>err)
       setRateSpinner(false)
    }
    const addRate = async(productId,rate)=>{
      if(!token) return toast.error('قم بتسجيل الدخول ')
      setRating(false)
      const res = await addRateProduct(productId,rate)
      if(res?.data.success){
          toast.success(res.data.message)
      }
      refetch()
    } 

  return (
    <section>
      <Helmet>
        <title>تفاصيل المنتج</title>
      </Helmet>
      {rateSpinner ?       <div className="fixed w-full h-full flex justify-center items-center bg-[#ffffff6b] z-20 p-20 rounded-3xl top-0 left-0">
<HashLoader
  color="#6f3c2e"
  size={100}
/></div>
:null}
  {rating ?   <div className="flex items-center flex-col fixed justify-center w-11/12 md:w-[400px] bg-[#fffffff1] z-20 p-20 rounded-3xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
  <i onClick={()=>setRating(false)} className="fa-solid fa-circle-xmark absolute right-2 cursor-pointer text-2xl p-2 text-red-600 transition-colors duration-150 top-2"></i>
         <p className="font-bold">تقيمك {rate}</p>
         <div className="my-3">
     {[...Array(5)].map((star,index)=> {
       const currentIndex = index + 1
       return <i key={index} onClick={()=> {setRate(currentIndex)}} onMouseEnter={()=>setHover(currentIndex)} onMouseLeave={()=>setHover(null)}  className={`${currentIndex <= (hover||rate) ? "text-orange-400" : ""} fa-solid fa-star cursor-pointer  text-xl md:text-3xl `}></i>
     }
     )}
     </div>
     <button onClick={()=>addRate(data?.data?.data?._id,rate)} className="boder py-2 px-4 rounded-lg bg-[--mainColor] text-sm mt-2 font-semibold hover:scale-105">ارسال التقيم</button>
   </div> :"" }



      

      {isLoading ? 
        <section className="flex justify-center pt-48">
      <BeatLoader color="#6f3c2e"   margin={13}  size={50} />
    </section>
       :     <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10 my-10 text-base">
          <div className="w-full mb-10 mx-auto lg:mx-0">
          <Slider {...settings}>
            {data?.data?.data.imageCover.map((img,i)=> <div key={i}>
              <img src={img.secure_url} alt="product-img" className="mx-auto w-[550px] h-[340px]" />
            </div>) }
        </Slider>
      
          </div>
          <div className=" border-s-8 ps-10 border-[--mainColor]">
            <h3>{data.data.data.name}</h3>
              <p className="my-4 text-gray-600">{data.data.data.description}</p>
              <div className="my-5">
              <span>تقيم {data.data.data.avgRating}</span>
              <span onClick={()=>setRating(true)} className="border-s ms-4 ps-4 cursor-pointer">اضف تقيمك !</span>
              </div>
              {data.data.data.discount ? <>
        <p className="mt-2 font-bold pb-5 text-[--textColor]"> <span className="pe-4">{data.data.data.finalPrice} ج.م</span> <span className="line-through font-normal text-sm">{data.data.data.price} ج.م</span></p>
      </>
    :   <p className="mt-2 font-semibold pb-5">{(data.data.data.finalPrice) * count} ج.م</p>
    }
              <p>التوفر :  {data.data.data.stock ? "هذا المنتج متوفر" : "هذا المنتج غير متوفر في الوقت الحالي "}</p>
              <h5 className="mt-7 mb-3"> الكمية المطلوبة : {count}</h5>
              <div className="flex gap-5 ">
                <button className="border px-4 sm:px-2  bg-blue-400 rounded text-xl"onClick={()=>setCount(count+1)}>+</button>
                <button className="border px-4 sm:px-2  bg-red-400 rounded text-xl" onClick={()=>setCount(count-1)} >-</button>
              </div>
              { loading ? <button className="btn border rounded bg-[--mainColor] px-4 py-1 mt-10" disabled={loading}><ClipLoader  size={20} color="#6f3c2e" />
</button>:
              <button onClick={()=>addToCart({productId:data.data.data._id,quantity:count})} className="btn border rounded bg-[--mainColor] px-4 py-1 mt-10">اطلب المنتج</button>

              }
                  
            
          </div>  


          
        </div>
}
    
    </section>
  )
}
