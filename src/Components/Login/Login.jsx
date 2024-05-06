import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet-async";


export default function Login() {
  const [errRes, seterrRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setToken} = useContext(TokenContext)
  const navigate = useNavigate()

  async function handleSubmit(values){
    setLoading(true)
     await axios.post('https://elsory-sweets.onrender.com/api/v1/auth/signIn',values)
    .then((response)=> {
      if(response.status){
        localStorage.setItem('token',response.data.token);
        navigate('/')
      }
    })
    .catch((error)=> seterrRes(error.response.data.error))
    setLoading(false)
  }
    const validationSchema = Yup.object({
      email: Yup.string()
     .email('البريد غير صحيح')
     .required('البريد الالكتروني مطلوب'),
      password: Yup.string()
     .min(3, 'طول كلمة المرور اقل من 3')
     .required('كلمة المرور مطلوبة'),
    })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
      <title>تسجيل الدخول</title>
        </Helmet>
      <section>
        <div className="container mx-auto px-5">
          <h4 className="font-bold text-xl mt-4 mb-10 text-center border-b pb-5">تسجيل الدخول</h4>
          {errRes ?  <p className="my-6 mx-auto bg-red-500 px-5 py-2 rounded text-[#fff] shadow-xl w-fit">{errRes}</p> : ''}
          <form className="sm:w-3/4 mx-auto mt-5 flex flex-col text-sm lg:text-base" onSubmit={formik.handleSubmit}>
          {formik.errors.email && formik.touched.email ? <p className="my-6 mx-auto bg-red-500 px-5 py-2 rounded text-[#fff] shadow-xl">{formik.errors.email}</p> : ""}
            <label htmlFor="email">البريد الالكتروني :</label>
            <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="border p-2 my-4 rounded-sm"/>
            {formik.errors.password && formik.touched.password ? <p className="my-6 mx-auto bg-red-500 px-5 py-2 rounded text-[#fff] shadow-xl">{formik.errors.password}</p> : ""}
            <label htmlFor="password">كلمة المرور :</label>
            <input type="password" name="password" id="password"  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border p-2 my-3 rounded-sm"/>

              <div className="flex flex-col items-center sm:flex-row justify-center sm:justify-between mb-5 gap-y-5">
                {loading ? <>
                <div className="border bg-[--mainColor] w-fit py-2 px-5 rounded-md">
              <ClipLoader color="#36d7b7" size={19} />
                </div>
                </>:
            <button type="submit" className="border bg-[--mainColor] w-fit py-2 px-4 rounded-md ">تسجيل</button>
                }
             <GoogleOAuthProvider  clientId="653661650673-7n80eals4h2m8tbp0k4smo0ca3b3dltj.apps.googleusercontent.com">
              <GoogleLogin useOneTap={true}
  onSuccess={async({credential}) => {
    await axios.post('https://elsory-sweets.onrender.com/api/v1/auth/signInWithGoogle',{idToken: credential})
    .then((res)=>{if(res.data?.success){
      localStorage.setItem('token',res.data.token)
      setToken(res.data.token)
      navigate('/')}
    })
    .catch(async(err)=>{
      await axios.post('https://elsory-sweets.onrender.com/api/v1/auth/signUpWithGoogle',{idToken: credential})
      .then((res)=>{if(res.data?.success){
      localStorage.setItem('token',res.data.token)
      setToken(res.data.token)
        navigate('/')}
      })
    })
  }}
  onError={() => {
    console.log('Login Failed')
  }}
/>
                </GoogleOAuthProvider> 

              </div>
            <hr />
            <div className="flex justify-between flex-wrap gap-5 items-center my-4">
              <Link to='/'>نسيت كلمه السر ؟</Link>
                <Link to='/register'>عمل حساب جديد</Link>            
            </div>
          </form>
        </div>
      </section>
      
      </>
  )
}
