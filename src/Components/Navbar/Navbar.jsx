import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo.jpg'
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from './../../Context/Token';


const navWithDropdown = [
  {title:'الصفحة الرئيسية',link:'/'},
  {title:'المتجر',link:'/shop'},

  {title:'شرقي',link:'#',drop:[
    {title:'- بسبوسة',link:'/sharqy/basbosa'},
    {title:'- هرايس',link:'/sharqy/hrays'},
    {title:'- كنافة',link:'/sharqy/konafa'},
    {title:'- نواشف',link:'/sharqy/nwashef'},
    {title:'- علب مشكل',link:'/sharqy/mshkl'},
  ]},
  {title:'كعك وبسكويت',link:'#',drop:[
    {title:'- نواعم',link:'#'},
    {title:'- مخبوزات',link:'#'}
  ]},
  {title:'غربي',link:'#',drop:[
    {title:'- جاتوه',link:'/ghapy/gato'},
    {title:'- تورت',link:'/ghapy/tart'},
  ]},
  // {title:'شوكولاتة',link:'#'},
  {title:'حلاوة المولد',link:'#'},
  {title:'المنيو',link:'/menu'},
  {title:'المفضلة',link:'/wishlist'},

]
export default function Navbar() {
  const navigate = useNavigate()
  const {token,setToken} = useContext(TokenContext)
  const [nav,setNav] = useState(false)
  function handleLogOut (){
    setToken(null)
    localStorage.removeItem('token')
    navigate('/')
  }
  
  const [dropDown,setDropDown] = useState('')
  function handleDropDown(){
    if(dropDown.length){
      document.addEventListener('click',(event)=>{
        if(event.target.closest('nav') == null){
          setDropDown('')
        }
      })
    }
    if(nav){
      document.addEventListener('click',(event)=>{
        if(event.target.closest('nav') == null){
          setNav(false)
        }
      })
    }

  }
  useEffect(()=>{
    document.addEventListener('scroll',()=>{
      if(window.scrollY > 200){
        document.querySelector('nav').style.background = '#F6F0D8'
        // document.querySelector('nav').style.position = 'fixed'
        document.querySelector('nav button i').style.color = '#fff'
      }else{
        document.querySelector('nav').style.background = '#fff'
        // document.querySelector('nav').style.position = 'sticky'
        document.querySelector('nav button i').style.color = '#eedfbb'
      }
    })
  },[])
  useEffect(()=>{
    handleDropDown()
  },[dropDown])
  const dropLiStyle = 'absolute flex-col bg-[#fff] rounded w-52 top-full mt-6 border shadow-xl z-4'

  return (
    <>
    <nav className='px-3 py-2 w-full top-0 z-10 fixed transition-all duration-300'>
      <div className="container mx-auto flex items-center justify-between top-0 relative font-semibold">
          {/* logo */}
          <Link to="/">
            <img src={logo} alt="logo" width={65} height={65} className="rounded-full" />
          </Link>

        {/* list */}
        <div className='xl:flex justify-between w-full hidden px-3 '>
        <ul className='flex gap-4 '>


    {navWithDropdown.map((li,index)=> <li key={index} className='relative cursor-pointer tracking-wider mx-1' onClick={()=>dropDown != li.title ? setDropDown(li.title) : setDropDown('')}>

      <Link to={li.link}>
            {li.title}
      </Link>
    {li?.drop ? <i className="fa-solid fa-caret-down ps-1 text-sm"></i> : null}
    {li.drop?   <ul id='dropDown' className={`${dropDown == li.title ? 'flex' : 'hidden'} ${dropLiStyle}`}>
    {li.drop?.map((dropLi,index)=> <Link to={dropLi.link} key={index} className='hover:bg-[--mainColor] mt-3 py-2 px-4'>
        {dropLi.title}
    
    </Link>)}
    </ul> : null}

    </li>
    
    )}
  
        </ul>
              <ul className='flex gap-4'>
                <li id='searchIcon'><i className="fa-solid fa-magnifying-glass cursor-pointer"></i></li>
                <li><Link to='/cart'><i className="fa-solid fa-cart-shopping cursor-pointer"></i></Link></li>
                {token ? <>
                <li onClick={handleLogOut} className='cursor-pointer'>تسجيل الخروج</li>
                
                  </>:   <li><Link to='/login'><i className="fa-regular fa-user ps-1"></i> تسجيل حساب</Link></li> 
                }
               </ul> 

        </div>

        {/* small screen */}
        <button id='bar' className='xl:hidden' onClick={()=> nav ? setNav(false) : setNav(true)}>
        <i className="fa-solid fa-bars-staggered text-3xl text-[--mainColor]"></i>
        </button>
        {nav ? <>
          <motion.div initial={{ x: 100  }}   transition={{ duration: 0.2, }} animate={{x:0}} className='w-full left-0 overflow-y-auto h-[60vh] fixed xl:hidden bg-[#fff] rounded-lg top-[15%] px-4 py-5'>
            <div className='flex items-center justify-between '>
          <i className="fa-regular fa-circle-xmark text-3xl text-red-500 cursor-pointer" onClick={()=>setNav(false)}></i>  
          <ul className='flex gap-x-3 text-base flex-wrap '>
                <li onClick={()=>{setNav(false)}} id='searchIcon'><i className="fa-solid fa-magnifying-glass cursor-pointer"></i></li>
                <li><Link  onClick={()=>setNav(false)} to='/cart'><i className="fa-solid fa-cart-shopping cursor-pointer"></i></Link></li>
                <li ><Link  onClick={()=>setNav(false)} to='/login'><i className="fa-regular fa-user ps-1"></i> تسجيل حساب</Link></li>
               </ul> 
            </div>
            <div className='flex  justify-between mt-5'>

        <ul className='flex gap-y-3  flex-col text-sm md:text-base'>
              {navWithDropdown.map((li,index)=> <li key={index} className='relative cursor-pointer my-2 text-base' onClick={()=>dropDown != li.title ? setDropDown(li.title) : setDropDown('')}>

      <Link onClick={()=>{if(!li.drop) setNav(false)}} to={li.link}>
    {li.title}
      </Link>
    {li?.drop ? <i className="fa-solid fa-caret-down ps-1 text-sm"></i> : null}
    {li.drop?   <ul id='dropDown' className={`${dropDown === li.title ? 'flex' : 'hidden'} my-1 gap-y-1 flex-col py-2 `}>
    {li.drop?.map((dropLi,index)=> <li key={index}  className='hover:bg-[--mainColor] px-2 py-1'>
      <Link   onClick={()=>setNav(false)}  to={dropLi.link}>{dropLi.title}</Link>
    </li>)}
    </ul> : null}

    </li>
    
    )}

        </ul>
          
               </div>
        </motion.div>

        </> :""}

      </div>
    </nav>
  
    </>
  );
}