import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { BeatLoader, ClipLoader } from "react-spinners";
import { CartContext } from "../../Context/Cart";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const {getCart,handleQuantity,errRes,removeProduct,deleteCart} = useContext(CartContext)
  const [loading,setLoading] = useState(false)
  const [quantityLoad,setQuantityLoad] = useState(false)
  const navigate = useNavigate()
  const {data,isLoading,refetch} = useQuery('cart',getCart,{})
  const handleRemoveProduct = async(productId)=>{
    setLoading(true)
    const res = await removeProduct(productId)
    if(res.data?.success){
      toast.success("تم ازالة المنتج بنجاح")
      refetch()
    }else{
      toast.error("حدث خطأ")
    }
    setLoading(false)
  }
  const handleProductQuantity = async(productId,quantity,quan)=>{
    setQuantityLoad({id:productId,status:true,quan})
    const res = await handleQuantity({productId,quantity})
    if(res.data?.success){
      toast.success("تم تعديل العدد بنجاح")
    }else if(res.response?.data.error){
      toast.error(res.response.data.error)
    }else toast.error('حدث خطأ')
    setQuantityLoad(false)
    refetch()
  }
  const deleteCartButton = ()=>{
    Swal.fire({
      title: "هل انت متاكد؟",
      text: "سيتم حذف السلة بشكل كامل !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم , اريد حذفها",
      cancelButtonText: "لا",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const dlt = await deleteCart()
        if(dlt.data.success){
          Swal.fire({
            title: "تم الحذف !",
            text: "تم تفريغ السلة بالكامل",
            icon: "success"
          });
          navigate('/')
          
        }
        }else{
          toast.error('حدث خطأ')
        }
        refetch()
  
    });
  }
  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])
  return (
    <section>
  <Helmet>
  <title>السلة</title>
</Helmet>
          <div className="container mx-auto">
          <h3 className="font-bold text-xl border-b-2 border-[--textColor] w-fit pb-2 px-4 mx-auto">السلة <i className="fa-solid fa-cart-shopping ps-2"></i></h3>
      {isLoading ? <section className="flex justify-center pt-16">
      <BeatLoader color="#6f3c2e"   margin={13}  size={50} />
    
    </section> :    <div className="border mt-5 p-3 rounded">
          <div className="flex justify-between flex-wrap mb-7 items-center">
            <div>
            <h4 className="font-bold md:tracking-wide mb-3" >المبلغ المطلوب : {data?.data?.data?.subTotal} ج.م</h4>
            <h4>عدد المنتجات : {data?.data?.data?.products.length}</h4>
            </div>
            <button className="border bg-[--mainColor] px-3 py-2 rounded">شراء الان</button>
          </div>
        {data?.data?.data?.products?.map((item,index)=> <div className="border py-3" key={index}>
            <div className="flex flex-col-reverse md:flex-row md:justify-between px-3 md:items-center">
            <div className="flex flex-col">
                <h3>{item.title}</h3>
                <p className="my-1">الكمية : <span className="text-[--textColor]">{item.quantity}</span></p>
                <p className="my-1">سعر الواحد : {item.price} ج.م</p>
                {item.discount ? <>
                  <p className="text-gray-600">خصم : {item.discount}ج.م</p>
                  <p className="my-2">سعر المنتج بعد الخصم : {item.finalPrice}</p>
                </> :   <br />}
              
                <span className="font-bold">المجموع : {item.totalPrice} ج.م</span>
              </div>
            
                <div className="mb-4">
                  {errRes?.error && errRes?.id == item.productId._id ? <p className=" mb-3 bg-red-500 px-5 py-2 rounded text-[#fff] shadow-xl">{errRes.error}</p> : ""}
                  <div className="flex gap-2 items-center justify-center">
                    {quantityLoad?.id == item.productId._id && quantityLoad?.quan == "up" ?<button className="border py-0 px-4 rounded  text-2xl font-bold bg-[--mainColor]" disabled={quantityLoad.status}><ClipLoader  size={20} color="#6f3c2e" /></button>
                    :<button className="border py-0 px-4 rounded bg-blue-300 text-2xl font-bold" onClick={()=>{handleProductQuantity(item.productId._id,++item.quantity,"up")}}>+</button>
                  }
                <p className="text-[--textColor] font-bold text-xl">{item.quantity}</p>
                {quantityLoad?.id == item.productId._id && quantityLoad?.quan == "down" ? <button className="border py-0 px-4 rounded  text-2xl font-bold bg-[--mainColor]" disabled={quantityLoad.status}><ClipLoader  size={20} color="#6f3c2e" /></button>
                :  <button className="border py-0 px-4 rounded bg-red-500 text-2xl font-bold" onClick={()=>handleProductQuantity(item.productId._id,--item.quantity,"down")}>-</button>}
                  </div>
                </div>
        
              <div className="mx-auto my-3 md:mx-0 text-center">
                <img src={item.productId?.image?.secure_url} width={300} height={300} className="rounded w-full md:w-[300px] " alt="product image" />
                {loading ? <button className="btn border rounded bg-[--mainColor] px-4 py-1 my-3" disabled={loading}><ClipLoader  size={20} color="#6f3c2e" />  </button>
                :<button onClick={()=>handleRemoveProduct(item.productId._id)} className="border px-2 py-1 bg-[--mainColor] transition-all hover:bg-red-400 rounded-lg my-3">حذف المنتج</button>
}
              
              </div>
            </div>
           </div>)}

        </div>
    }
    {data?.data?.data?.subTotal ? <button onClick={()=>deleteCartButton()} className="bg-red-400 px-4 rounded py-1 block my-6 mx-auto">حذف السلة</button>:""}

          </div>
    </section>
  )
}
