import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
export default function Footer() {

  const contact = [
    {icon:'fa-brands fa-whatsapp',title:' الهاتف  :' , para:'01029284032'},
    {icon:'fa-regular fa-envelope',title:' البريد الإلكتروني : ' , para:'syriansweets@gmail.com'},
    {icon:'fa-regular fa-clock',title:' ساعات العمل : ',para:'8:00 صباحاً - 1:00 صباحاً'},
  
  ]
  const info = [
    {icon:'fa-solid fa-angle-right' , title:'من نحن'},
    {icon:'fa-solid fa-angle-right' , title:'فروعنا'},
    {icon:'fa-solid fa-angle-right' , title:'عروض خاصة'},
    {icon:'fa-solid fa-angle-right' , title:'المصنع & الانتاج'},
    {icon:'fa-solid fa-angle-right' , title:'الشروط والاحكام'},

  ]

  const follow = [
    {icon:'fa-brands fa-facebook-f text-2xl text-[#1877f2]' ,link:'https://www.facebook.com/syriansweetss'},
    {icon:'fa-brands fa-instagram text-2xl' ,link:'#'},
    {icon:'fa-brands fa-whatsapp text-2xl text-[#25d366]' ,link:'https://wa.me/201029284032'},
  ]
  return (
    <footer className='mt-10'>
      <hr />
      <div className="container mx-auto px-5 py-10 md:p-16 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 md:gap-x-11 gap-y-10">

        <div>
          <h4 className='font-bold text-xl'>اتصل بنا</h4>
          <ul>
            {/* العنوان */}
            <h6 className="mt-5 mb-2">
            <i className="fa-solid fa-genderless"></i> العنوان  :
            </h6>
            <li className='text-sm'>
              <p>

          -  حوش عيسي شارع23 يوليو بجوار كوبري وسط البلد
              </p>
              <p>

          -   أبو المطامير الطريق الدائري بجوار توكيل زانوسي
              </p>
            </li>

          {contact.map((li,index)=> <li key={index}> 
            <h6 className='mt-5 font-semibold text-sm lg:text-lg'> <i className={li.icon}></i> {li.title}</h6>
            <p>{li.para}</p>
          </li>)}
            



          </ul>
        </div>


      <div>
        <h4 className='font-bold text-xl md:text-2xl'>معلومات عنا</h4>
        <ul className="mt-5 text-sm lg:text-lg">
          {info.map((li,index)=> <li key={index} className="flex items-center py-3 md:py-4 px-3 hover:scale-105 hover:bg-[--mainColor] transition-all rounded cursor-pointer">
            <i className={`${li.icon} pe-3 pt-1`}></i>
            {li.title}
             <hr/>
            </li>    )}
        
        </ul>
      </div>



      <div>
        <h4 className='font-bold text-xl md:text-2xl'>تابعنا</h4>
        <ul className="mt-5">
          <div className='linkes flex gap-3 justify-center items-center px-5'>
            {follow.map((li,index)=>
              <li key={index} className='w-12 h-12 cursor-pointer bg-[--mainColor] flex items-center justify-center rounded-full  hover:scale-105 transition-all'>
            <Link to={li.link} target='_blank'><i className={`${li.icon} `}></i> </Link> 
              </li>
            )} 

          </div>
          <img src={logo} width={250} height={250} className='w-52 mx-auto' alt="shop logo" />
        </ul>
      </div>
      <div>

      </div>


        </div>
      </div>

<p className='m-0 text-center bg-[--mainColor] font-bold text-xl italic py-3'>❤️Elsory-Group ❤️</p>
      
      
    </footer>
  )
}
