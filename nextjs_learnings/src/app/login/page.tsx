"use client";
import Link from 'next/link'
import React,{useEffect} from "react"
import { useRouter } from 'next/navigation';
import axios  from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router =useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    
  })
  const[buttonDisabled, setButtonDisabled] =
   React.useState(false);
   const[loading, setLoading] = React.useState(false);

  const onLogin= async () => {
    try{
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log("Login response:", response);
      toast.success("login successful")
      setTimeout(() => {
        router.push('/profile');
      }, 500);


    }
    catch(error:any){
      console.log("Login failed",error);
      console.log("Error response:", error.response);
      toast.error(error.response?.data?.error || error.message);


    }
    finally{
      setLoading(false);
    }
   
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 text-black">
      <div className="p-8 bg-white shadow-md rounded-lg flex flex-col w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">
          {loading ? "Logging in..." : "Login"  }
        </h1>
        <hr className="mb-6" />


        <label className="text-sm font-semibold mb-1" htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 transition duration-200"
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='email'
        />

        <label className="text-sm font-semibold mb-1" htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-blue-600 transition duration-200"
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='password'
        />

        <button 
          onClick={onLogin}
          className="p-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200 active:scale-95"
        >
        Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have account? <Link href="/signup" className="text-blue-600 hover:underline font-medium">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}