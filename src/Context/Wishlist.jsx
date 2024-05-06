import axios from "axios";
import { createContext, useContext } from "react";
import { TokenContext } from "./Token";


export const WishlistContext = createContext()


export default function WishlistContextProvider({ children }) {
  const {token} = useContext(TokenContext)
  const getWishlist = async()=>{
    return await axios.get(`https://elsory-sweets.onrender.com/api/v1/wishlist`,{headers:{token}})
    .then((res)=>res)
    .catch((err)=>err)
  }
  const addProductToWishlist = async(productId)=>{
    return await axios.post(`https://elsory-sweets.onrender.com/api/v1/wishlist/${productId}`,{},{headers:{token}})
    .then((res)=>res)
    .catch((err)=>err)
  }
  const removeProductFromWishlist = async(productId)=>{
    return await axios.patch(`https://elsory-sweets.onrender.com/api/v1/wishlist/${productId}`,{},{headers:{token}})
    .then((res)=>res)
    .catch((err)=>err)
  }
  const deleteWishlist = async()=>{
    return await axios.delete(`https://elsory-sweets.onrender.com/api/v1/wishlist/`,{headers:{token}})
    .then((res)=>res)
    .catch((err)=>err)
  }



  return <WishlistContext.Provider value={{addProductToWishlist,getWishlist,removeProductFromWishlist,deleteWishlist}}>{children}</WishlistContext.Provider>
}