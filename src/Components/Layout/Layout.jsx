import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from './../Footer/Footer';
import { useEffect, useState } from "react";
import Search from "../Search/Search";

export default function Layout() {
  const [search,setSearch] = useState(false)
  const [activeArrow,setActiveArrow] = useState(false)
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY < 200 ){
          setActiveArrow(true)
        }else{
        setActiveArrow(false)
      }
    })
    document.addEventListener('click',(event)=>{
      if(event.target.closest('#searchIcon') != null){
        setSearch(true)
      }
    if(search && event.target.closest('#search') == null){setSearch(false)}
  })

    
  })
  function handleArrow(){
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
  return (
    <>
    <Navbar/>
    {search ? <>
      <Search active={search}/> 
    </>
      : null
    }
    <Outlet/>
    <div className={`${activeArrow ? 'hidden' : ''} fixed bg-[--mainColor] border shadow-lg w-15 h-15 z-20 bottom-5 cursor-pointer right-5 rounded-full`} onClick={handleArrow}>
    <i className="fa-solid fa-caret-up px-4 py-2 text-lg sm:text-xl text-[--grayColor]"></i>
    </div>
    <Footer/>
    </>
  )
}
