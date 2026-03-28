"use client";
import Link from 'next/link'
import React,{useEffect} from "react"
import { useRouter } from 'next/navigation';
import axios  from 'axios';
import { toast } from 'react-hot-toast/headless';

export default function SignupPage() {
  const router=useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDisabled,setButtonDisabled] = React.useState(false);
  const[loading,setLoading] = React.useState(false);

  const onSignup = async () => {
    try{
         setLoading(true);
         const response=await axios.post("/api/users/signup", user);
         console.log("Signup success",response.data);
         toast.success("Signup successful! Redirecting to login...");
         router.push("/login");
    }
    catch(error:any){
      console.log("Signup failed", error);
      console.log("Error response:", error.response);
      toast.error(error.response?.data?.error || error.message);

    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 text-black">
      <div className="p-8 bg-white shadow-md rounded-lg flex flex-col w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">{loading?"Signing up...":"Signup"}</h1>
        <hr className="mb-6" />

        <label className="text-sm font-semibold mb-1" htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 transition duration-200"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='username'
        />

        <label className="text-sm font-semibold mb-1" htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 transition duration-200"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='email'
        />

        <label className="text-sm font-semibold mb-1" htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-blue-600 transition duration-200"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='password'
        />

        <button 
          onClick={onSignup}
          className="p-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200 active:scale-95"
        >
          {buttonDisabled ? "NO Signup" : "Signup"}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline font-medium">Login here</Link>
        </p>
      </div>
    </div>
  );
}