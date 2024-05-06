import { createContext, useState } from "react";


export const TokenContext = createContext()

export default function TokenContextProvider({ children }){

  const [token,setToken] = useState(null)
return  <TokenContext.Provider value={{token,setToken}}>{children}</TokenContext.Provider>
}