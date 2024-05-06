import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"


export default function Search({active}) {
  const [search,setSearch] = useState('')
  const {data,refetch} = useQuery('searchProduct',async()=>
   await axios.get(`https://elsory-sweets.onrender.com/api/v1/product?name=${search}`)
  .then((res)=>res)
  )
  return <div id="search" className={`${active ? 'fixed' : 'hidden'} container mx-auto p-5 rounded shadow-lg w-8/12 bg-[#fff]  top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20`}>
    <input type="text" className="w-full py-2 px-3 border mb-4" name="search" id="search" placeholder="ابحث عن المنتج" onKeyUp={(event)=>{setSearch(event.target.value);refetch()}}/>
    <ul>
      {search.length ? data?.data?.data?.map((product,index)=> <li className="my-1" key={index}><Link to={`/details/${product._id}`} className="rounded px-3 bg-[--mainColor] min-w-full block py-2"> {product.name}</Link></li>) : null}
    </ul>
  </div>
}
