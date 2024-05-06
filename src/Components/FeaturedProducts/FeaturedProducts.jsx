import Slider from "react-slick";
import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/Cart";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BeatLoader, ClipLoader } from 'react-spinners';
import { WishlistContext } from "../../Context/Wishlist";
import { TokenContext } from "../../Context/Token";
export default function FeaturedProducts() {
  const {addProductToCart} = useContext(CartContext)
  const {addProductToWishlist} = useContext(WishlistContext)
  const [hover,setHover] = useState({id:"",status:false})
  const [loading,setLoading] = useState(false)
  const [love,setLove] = useState(false)
  const [loveArr ,setLoveArr] = useState([])
  const {token} = useContext(TokenContext)
  const addToCart = async(productId)=>{
    if(!token) return toast.error('قم بتسجيل الدخول ')
    setLoading({id:productId})
    const res = await addProductToCart({productId})
    if(res.data.success){
      toast.success(res.data?.message)
    }
    setLoading(false)
    }
  const addToWishlist = async(productId)=>{
    if(!token) return toast.error('قم بتسجيل الدخول ')
    setLoveArr([...loveArr,productId])
    setLove({id:productId})
    const res = await addProductToWishlist(productId)
    if(res.data?.success){
      toast.success(res.data.message)
    }else if(res.response){
      toast.success(res.response?.data?.error)
    }else{
      toast.success(res.data?.message)
    }
    setLove(false)
  }

  const {data,isLoading} = useQuery('featuredProducts',async()=>{
    return await axios.get('https://elsory-sweets.onrender.com/api/v1/product?size=8')
   .then((res)=>res)
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1120,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows:false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows:false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows:false
        }
      }
    ]
  };
  return (
    <section className="container mx-auto py-5 md:px-10">
            <h3 className="font-bold text-xl border-b-2 border-[--textColor] w-fit pb-2 px-4 mx-auto mb-10">منتجات مميزة</h3>

        <Slider {...settings}>
    {isLoading ?  <section className="flex justify-center pt-16">
      <BeatLoader color="#6f3c2e"   margin={13}  size={50} />
    
    </section> : data?.data?.data?.map((product,index)=> <div key={index} >
      <div className="text-center border p-5 rounded mx-5 lg:mx-2 bg-[--mainColor]" dir="rtl">
<Link to={`/details/${product._id}`}>
        <img src={product.image.secure_url} width={300} height={300} loading="lazy" className="mx-auto h-[160px] rounded"  alt={product.name} />
        <h4 className="font-bold text-sm my-2 text-[--textColor]">{product.name}</h4>
        {product.discount ? <>
        <p className="mt-2 text-center font-bold pb-5 text-[--textColor]"> <span className="px-4">{product.finalPrice} ج.م</span> <span className="line-through font-normal text-sm">{product.price} ج.م</span></p>
      </>
    :   <p className="mt-2 text-center font-semibold pb-5">{product.finalPrice} ج.م</p>
    }
</Link>
        <div className="flex gap-5 justify-center bg-[#fff] items-center rounded-3xl mt-4">
          {love.id == product._id ?  <span className="pt-1 hover:text-[--textColor] transition-all"><ClipLoader  size={18} color="#6f3c2e" /></span> 
          :<i onClick={(e)=>{addToWishlist(product._id)}} onMouseEnter={()=>setHover({id:product._id,status:true})} className={`${loveArr.includes(product._id) ? "text-red-500" :""} fa-solid fa-heart cursor-pointer p-2 hover:text-red-500 transition-all duration-300`}></i>
        }
        {loading?.id == product._id ? <span className="pt-1 hover:text-[--textColor] transition-all"><ClipLoader  size={18} color="#6f3c2e" /></span>

       : <i className="fa-solid fa-cart-plus cursor-pointer p-2 hover:text-[--textColor] transition-all" onClick={()=>{addToCart(product._id)}}></i>
      }

      </div>
      </div>
    </div>)
    }
    </Slider>
    </section>
  )
}
