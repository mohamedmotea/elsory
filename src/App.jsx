import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { TokenContext } from './Context/Token';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Shop from './Components/Shop/Shop';
import Gato from './Components/Gharpy/Gato';
import Details from './Components/Details/Details';
import Tort from './Components/Gharpy/Tort';
import Cart from './Components/Cart/Cart';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Menu from './Components/Menu/Menu';
import WishList from './Components/WishList/WishList'
import Basbosa from './Components/Sharqy/Basbosa';
import Hrays from './Components/Sharqy/Hrays';
import Konafa from './Components/Sharqy/Konafa';
import Nwashef from './Components/Sharqy/Nwashef';
import Mshkl from './Components/Sharqy/Mshkl';


function App() {
  const {setToken} =  useContext(TokenContext)
  useEffect(()=>{
    if(localStorage.getItem('token') != null){
      setToken(localStorage.getItem('token'))
    }
  },[])

  const router = createHashRouter([{path:'',element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
    {path:'/shop',element:<Shop/>},
    {path:'/ghapy/gato',element:<Gato/>},
    {path:'/ghapy/tart',element:<Tort/>},
    {path:'/sharqy/basbosa',element:<Basbosa/>},
    {path:'/sharqy/hrays',element:<Hrays/>},
    {path:'/sharqy/konafa',element:<Konafa/>},
    {path:'/sharqy/nwashef',element:<Nwashef/>},
    {path:'/sharqy/mshkl',element:<Mshkl/>},
    {path:'/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'/details/:id',element:<Details/>},
    {path:'/menu/:shopId',element:<Menu/>},
    {path:'/menu',element:<Menu/>},
    {path:'/wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute> },

    
  ]}])

  return (
    <>
      <HelmetProvider>

      <RouterProvider router={router}></RouterProvider>
      <Toaster/>
</HelmetProvider>
    </>
  )
}

export default App
