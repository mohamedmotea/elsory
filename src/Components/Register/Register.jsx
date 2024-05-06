import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners";
import * as Yup from 'yup';

export default function Register() {
  const [errRes, seterrRes] = useState(null);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  
  async function handleSubmit(values){
    setLoading(true)
    await axios.post('https://elsory-sweets.onrender.com/api/v1/auth/signUp',values)
    .then((response)=> {
      if(response.data.status){
        navigate('/login')
      }
    })
    .catch((error)=> seterrRes(error.response.data.error))
    setLoading(false)
  }
      let regPhone = /^01[0-2||5][\d]{8}$/
    const validationSchema = Yup.object({
      email: Yup.string()
     .email('البريد غير صحيح')
     .required('البريد الالكتروني مطلوب'),
      password: Yup.string()
     .min(3, 'طول كلمة المرور اقصر من 3')
     .required('كلمة المرور مطلوبة'),
     userName:Yup.string().required("الاسم مطلوب ").min(3, 'طول الاسم اقل من 3'),
     phoneNumber: Yup.string().matches(regPhone , 'صيغة الرقم خطأ')
    })
  const formik = useFormik({
    initialValues: {
      userName:"",
      email: "",
      password: "",
      phoneNumber:""
    },
    validationSchema: validationSchema,
    onSubmit:handleSubmit
  })
    
  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])
  return (
    <>
        <Helmet>
  <title>تسجيل دخول جديد</title>
</Helmet>
      <section>
        <div className="container mx-auto px-5">
          <h4 className="font-bold text-sm lg:text-lg mt-4 mb-10 text-center border-b pb-5">تسجيل حساب جديد</h4>
          {errRes ?  <p className="my-6 mx-auto bg-red-500 px-5 py-2 rounded text-[#fff] shadow-xl w-fit">{errRes}</p> : ''}
          <form onSubmit={formik.handleSubmit} className="sm:w-3/4 mx-auto mt-5 flex flex-col text-sm lg:text-base">
            <div className="flex items-center justify-between">
          <label htmlFor="userName">اسم المستخدم</label>
          {formik.errors.userName && formik.touched.userName ? <p className=" bg-red-500 px-2 py-2 rounded text-[#fff] shadow-sm">{formik.errors.userName}</p> : ""}
            </div>
            <input  value={formik.values.userName} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="userName" id="userName"  className="border p-2 my-4 rounded-sm"/>

            <div className="flex items-center justify-between">
            <label htmlFor="email">البريد الالكتروني :</label>
            {formik.errors.email && formik.touched.email ? <p className=" bg-red-500 px-2 py-2 rounded text-[#fff] shadow-sm">{formik.errors.email}</p> : ""}
            </div>
            <input  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email"  className="border p-2 my-4 rounded-sm"/>

            <div className="flex items-center justify-between">
            <label htmlFor="phoneNumber">رقم الهاتف</label>
            {formik.errors.phoneNumber && formik.touched.phoneNumber ? <p className=" bg-red-500 px-2 py-2 rounded text-[#fff] shadow-sm">{formik.errors.phoneNumber}</p> : ""}
              </div>
            <input  value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phoneNumber" id="phoneNumber"  className="border p-2 my-4 rounded-sm"/>

              <div className="flex items-center justify-between">
            <label htmlFor="password">كلمة المرور :</label>
            {formik.errors.password && formik.touched.password ? <p className=" bg-red-500 px-2 py-2 rounded text-[#fff] shadow-sm">{formik.errors.password}</p> : ""}
              </div>
            <input  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password"  className="border p-2 my-3 rounded-sm"/>

              <div className="flex justify-center sm:justify-between flex-wrap gap-5 ">
                {loading ? <>
                  <div className="border bg-[--mainColor] w-fit py-2 px-5 rounded-md mb-5">
              <ClipLoader color="#36d7b7" size={19} />
                </div>
                </>:<>
            <button type="submit" className="border text-sm bg-[--mainColor] w-fit py-2 px-4 rounded-md mb-5">تسجيل</button>
                
                </>}
                <GoogleOAuthProvider  clientId="653661650673-7n80eals4h2m8tbp0k4smo0ca3b3dltj.apps.googleusercontent.com">
              <GoogleLogin useOneTap={true}
  onSuccess={async({credential}) => {
    await axios.post('https://elsory-sweets.onrender.com/api/v1/auth/signUpWithGoogle',{idToken: credential})
    .then((res)=>{if(res.data?.success){
      navigate('/login')}
    })
    .catch((err)=>{seterrRes(err.response.data.error)})
  }}
  onError={() => {
    console.log('Login Failed')
  }}
/>
                </GoogleOAuthProvider> 

              </div>
            <hr />
            <div className="flex justify-between items-center mt-4 text-sm lg:text-lg">
              <Link to='/login'>لديك بالفعل حساب ؟</Link>
                    
            </div>
          </form>
        </div>
      </section>
      
      </>
  )
}
