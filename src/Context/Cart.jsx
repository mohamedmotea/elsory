import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./Token";


export const CartContext = createContext()

export default function CartContextProvider({ children }) {
  const [count, setCount] = useState(0)
  const [load,setLoad] = useState(false)
  const [errRes,setErrRes] = useState(null)
  const {token} = useContext(TokenContext)
  const getCart = async()=>{
    return await axios.get('https://elsory-sweets.onrender.com/api/v1/cart',{
      headers:{
        token
      }
    })
    .then((res)=>{setErrRes(null);return res})
    .catch((err)=>err)
  }
  const handleQuantity = async({productId,quantity})=>{
  return await  axios.put(`https://elsory-sweets.onrender.com/api/v1/cart/${productId}`,{quantity},{headers:{token}})
  .then((res)=> res)
  .catch((err)=>err)
}
 const removeProduct = async(productId)=>{
  return await axios.patch(`https://elsory-sweets.onrender.com/api/v1/cart/${productId}`,{},{headers:{token:token}})
 .then((res)=>{setLoad(true);setErrRes(null);res;setLoad(false);return res})
 .catch((err)=>err)
}
  const deleteCart = async()=>{
    return await axios.delete('https://elsory-sweets.onrender.com/api/v1/cart/',{headers:{token}})
    .then((res)=>res)
    .catch((err)=>err)
  }
  const addProductToCart = async({productId,quantity=1})=>{
    return await axios.post('https://elsory-sweets.onrender.com/api/v1/cart',{productId,quantity},{headers:{token}})
    .then((res)=> res)
    .catch((err)=>err)
  }

  return (
    <CartContext.Provider value={{ getCart,handleQuantity,errRes,removeProduct, deleteCart,load,setLoad, setCount,addProductToCart}}>
      {children}
    </CartContext.Provider>
  )
}