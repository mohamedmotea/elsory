import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { BeatLoader, ClipLoader } from "react-spinners"
import toast from "react-hot-toast"
import { Helmet } from "react-helmet-async"
import { WishlistContext } from "../../Context/Wishlist"
import { CartContext } from "../../Context/Cart"
import { TokenContext } from "../../Context/Token"


export default function ProductBanner({apiName='https://elsory.netlify.app/',url='https://elsory.netlify.app/',sectionName='قسم'}) {
  const {addProductToCart} = useContext(CartContext)
  const {addProductToWishlist} = useContext(WishlistContext)
  const [loading,setLoading] = useState(false)
  const [love,setLove] = useState(false)
  const [loveArr ,setLoveArr] = useState([])
  const [page,setPage] = useState(1)
  const apiUrl = `${url}?size=8&page=${page}`
  const {token} = useContext(TokenContext)
  const addToCart = async(productId)=>{
    if(!token) return toast.error('قم بتسجيل الدخول ')
    setLoading({id:productId})
    const res = await addProductToCart({productId})
    if(res.data?.success){
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
  const [hover,setHover] = useState({id:"",status:false})
  const {data,isLoading} = useQuery([apiName,page],async()=>{
    return await axios.get(apiUrl)
    .then((res)=>res)
    .catch((err)=>err)
  },{
    cacheTime: 100000,
    keepPreviousData:true,
  })
  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])
  return (
    <section className="bg-[--mainCoor]">
        <Helmet>
  <title>{sectionName}</title>
  <meta name="description" content={`حلواني السوري  .. يقدم لك قائمة متكاملة من الحلويات الشرقية والتورت والغربي   ${sectionName}`} />
  <link rel="canonical" href="https://elsory.netlify.app/"/>
        </Helmet>
    <div className="container mx-auto py-5">

      <h3 className="font-bold text-xl border-b-2 border-[--textColor] w-fit pb-2 px-4 mx-auto"> قسم {sectionName}</h3>


    {isLoading ? <section className="flex justify-center pt-16">
      <BeatLoader color="#6f3c2e"   margin={13}  size={50} />
    
    </section> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:gap-x-11 gap-y-10 my-10 px-10">
    {data?.data?.data?.map((product,index)=> <div key={index} className="border rounded-lg bg-[--mainColor] shadow-md">
      <Link to={`/details/${product._id}`}>
      <img src={product.image.secure_url} width={300} height={300} loading="lazy" className="mx-auto rounded-s w-full rounded-e h-[160px]" alt="product-img" />
    
      <h2 className="font-bold text-center w-fit mx-auto mt-4 text-[--textColor] text-sm border-[--textColor] bg-[#fff] border-2 rounded-full px-3 py-1">{product.name}</h2>
      {product.discount ? <>
        <p className="mt-2 text-center font-bold pb-5 text-[--textColor]"> <span className="px-4">{product.finalPrice} ج.م</span> <span className="line-through font-normal text-sm">{product.price} ج.م</span></p>
      </>
    :   <p className="mt-2 text-center font-bold pb-5 text-[--textColor]">{product.finalPrice} ج.م</p>
    }
      
      </Link>
  
      <div className="flex gap-5 justify-center bg-[#fff] items-center mt-4 text-lg">
      {love.id == product._id ?  <span className="pt-1 hover:text-[--textColor] transition-all"><ClipLoader  size={18} color="#6f3c2e" /></span> 
          :<i onClick={(e)=>{addToWishlist(product._id)}} onMouseEnter={()=>setHover({id:product._id,status:true})} className={`${loveArr.includes(product._id) ? "text-red-500" :""} fa-solid fa-heart cursor-pointer p-2 hover:text-red-500 transition-all duration-300`}></i>
        }
        {loading?.id == product._id ? <span className="pt-1 hover:text-[--textColor] transition-all"><ClipLoader  size={18} color="#6f3c2e" /></span>

       : <i className="fa-solid fa-cart-plus cursor-pointer p-2 hover:text-[--textColor] transition-all" onClick={()=>{addToCart(product._id)}}></i>
      }
      </div>
              
      </div>)}

  </div>}
  <div dir="ltr" className="flex justify-center text-xl border w-fit mx-auto"> 
      {[...Array(Math.ceil(data?.data?.totalProducts / 8)||1)].map((item,index)=> <button  key={index} onClick={(e)=>{  setPage(index+1);window.scrollTo({top:0}) }}
      className={`${page === index+1 ? 'bg-[--mainColor]':""}   border last-of-type:border-none hover:bg-[--mainColor] px-4 py-1 transition-all `} >{index+1}</button>)}
      </div>
    </div>
  </section>
  )
}
