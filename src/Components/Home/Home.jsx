import './Home.css'
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';
import Sections from './../Sections/Sections';
import { useEffect } from 'react';
export default function Home() {
  
  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])
  return (<>
    <Helmet>
  <title>حلواني السوري</title>
</Helmet>
  <section id='home' className='flex justify-center items-center text-center pb-16'>
    <motion.div initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1}}
    transition={{ duration: 0.8 }}  className='bg-[--mainColor] rounded p-3 shadow-xl'>
      <h2 className='font-bold text-xl md:text-3xl mb-5 text-[--textColor]'>المذاق الملكي</h2>
      <p className='text-sm md:text-lg'>يقدم لك حلواني السوري قائمة متكاملة من الحلويات الشرقية والتورت والغربي </p>
    </motion.div>
    </section>
    <Sections/>
    <FeaturedProducts/>
  </>
  )
}
