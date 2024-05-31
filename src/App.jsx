import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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


  return (
    <>
     <h1 className='bg-red-700 text-white'>hello appwrite</h1>
    </>
  )
}

export default App
