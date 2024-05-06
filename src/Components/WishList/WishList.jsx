
import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { CartContext } from "../../Context/Cart"
import { BeatLoader, ClipLoader } from "react-spinners"
import { WishlistContext } from "../../Context/Wishlist"
import toast from "react-hot-toast"
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
export default function WishList() {
  const navigate = useNavigate()
  const {getWishlist,removeProductFromWishlist,deleteWishlist} = useContext(WishlistContext)
  const {addProductToCart} = useContext(CartContext)
  const {data,isLoading,refetch} = useQuery('wishlist',getWishlist);
  const [hover,setHover] = useState({id:"",status:false})
  const [addEffect ,setAddEffect] = useState(null)
  const [removeEffect ,setRemoveEffect] = useState(null)
  const addToCart = async(productId)=>{
    setAddEffect({id:productId})
  const res = await addProductToCart({productId})
  if(res.data.success){
    await removeProductFromWishlist(productId)
    toast.success(res.data?.message)
    refetch()
  }else{
    toast.error(res.response.data.error)
  }
  setAddEffect(false)
  }
  const onRemoveProduct = async(productId)=>{
    setRemoveEffect({id:productId})
  const data =  await removeProductFromWishlist(productId);
  if(data?.data.status){
    toast.success(data?.data?.message)
  }else{
    toast.error(data?.response.data.error)
  }
  refetch()
  setRemoveEffect(false)
  }
  const dltWishlist = ()=>{
    Swal.fire({
      title: "هل انت متاكد؟",
      text: "سيتم حذف القائمة بشكل كامل !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم , اريد حذفها",
      cancelButtonText: "لا",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const dlt = await deleteWishlist()
        refetch()
        if(dlt.data.status){
          Swal.fire({
            title: "تم الحذف !",
            text: "تم تفريغ القائمة بالكامل",
            icon: "success"
          });
          navigate('/')
        }else{
          toast.error('حدث خطأ')
        }
        
      }
    });
  }

  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])


  return <section>
        <Helmet>
        <title>المفضلة</title>
        </Helmet>
    <div className="container mx-auto">
    <h3 className="font-bold text-xl border-b-2 border-[--textColor] w-fit pb-2 px-4 mx-auto mb-10">المفضلة</h3>
      <div className="my-10">
        {isLoading ?<section className="flex justify-center pt-16">
      <BeatLoader color="#6f3c2e"   margin={13}  size={50} />
    
    </section> :  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 px-10 gap-y-10">
    {data?.data?.data[0]?.products?.map((product,index)=> <div  key={index} className="text-center border shadow rounded"> 
    <Link to={`/details/${product._id}`}>
    <img src={product.image.secure_url} className="w-full h-[120px]"/>
    <h2 className="my-3 font-semibold">{product.name}</h2>
    <p className="font-semibold">{product.price} ج.م</p>
    </Link>
    <div className="flex justify-evenly my-4">
    {addEffect?.id == product._id ? <> <button className="border bg-[--mainColor] px-2 py-1 rounded my-3"
    ><ClipLoader  size={20} color="#6f3c2e" /></button>
    </>:  <button className="border bg-[--mainColor] px-2 py-1 opacity-85 hover:opacity-100 transition-opacity rounded my-3"
    onClick={()=>addToCart(product._id)}
    >اضافة للسلة</button>}
    {removeEffect?.id == product._id ? <button className="border bg-[--mainColor] px-2 py-1 rounded my-3"
    ><ClipLoader  size={20} color="#6f3c2e" /></button>
    :    <button className="border bg-red-400 px-2 py-1 rounded my-3 opacity-85 hover:opacity-100 transition-opacity"
    onClick={()=>onRemoveProduct(product._id)}>حذف</button>
  }
    {/* <button className="border bg-red-400 px-2 py-1 rounded my-3 opacity-85 hover:opacity-100 transition-opacity"
    onClick={()=>onRemoveProduct(product._id)}>حذف</button> */}
    </div>
    </div>)}
    </div>
     }
     {data?.data?.data[0]?.products?.length ? <button className="block mx-auto border py-1 px-2 bg-red-400 rounded mt-10"onClick={dltWishlist} >حذف قائمة المفضلة</button>: null}
      </div>
    </div>
  </section>
}
