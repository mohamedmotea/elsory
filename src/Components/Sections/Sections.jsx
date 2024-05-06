import sharqy from '../../assets/sections/sharqy.jpg'
import gharpy from '../../assets/sections/ghrby.jpeg'
import shkolate from '../../assets/sections/shkolate.jpg'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Sections() {
  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])
  return <section className='mt-10'>
    <div className="container mx-auto">
    <h3 className="font-bold text-xl border-b-2 border-[--textColor] w-fit pb-2 px-4 mx-auto"> الاقسام </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-10 md:gap-0 px-5">
        
          <div className="flex md:flex-col col-span-2 md:col-span-1 gap-x-2">
          <img src={sharqy} width={300} height={300} className='w-1/2 md:w-full h-[40vh] mx-auto rounded-lg md:rounded-none' alt='اصناف شرفي'/>
          <img src={gharpy} width={300} height={300} className='w-1/2 md:w-full h-[40vh] mx-auto rounded-lg md:rounded-none' alt='اصناف غربي' />
          </div>

          <div className="col-span-2">
          <Link>
          <img src={shkolate} width={300} height={300} className='w-full h-[80vh] mx-auto rounded-lg md:rounded-none' alt="اصناف حلويات وشوكولاتة" />
          </Link>
            </div>

          <div className="flex md:flex-col col-span-2 md:col-span-1 gap-x-2">
            <img src={gharpy} width={300} height={300} className='w-1/2 md:w-full h-[40vh] mx-auto rounded-lg md:rounded-none' alt='اصناف غربي'/>
            <img src={sharqy} width={300} height={300} className='w-1/2 md:w-full h-[40vh] mx-auto rounded-lg md:rounded-none' alt='اصناف شرفي' />
          </div>
      </div>
    </div>
  </section>
}
