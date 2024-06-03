import { useEffect, useState } from 'react'
import {Header,Footer} from "./components/index"



import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth';
import { login, logout } from './store/authSlice';

function App() {
 
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
      authservice.getCurrentUser()
      .then((userData)=>{

          if(userData){
              dispatch(login({userData}));
          }else{
              dispatch(logout());
          }

      })
      .finally(()=> setLoading(false))
  }, [])

  //teritory operator 
  return !loading ? (

    <div className='bg-yellow-700 h-screen w-screen p-10 '>
        <div className=' bg-green-700 h-full w-full flex justify-between flex-col items-center '>
                <Header/>
                <main>
                <Outlet/>
                </main>
                <Footer/>
        </div>

    </div>

  ): null 

  
}

export default App
