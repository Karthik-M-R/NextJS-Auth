"use client";
import axios from "axios"
import React,{useEffect, useState} from "react";
import Link from "next/link"
import {toast} from "react-hot-toast"
import {useRouter} from "next/navigation"


export default function ProfilePage() {
    const router=useRouter()
    const [data,setData]=useState<string | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)
    const logout=async ()=>{
        await axios.get('/api/users/logout')
        toast.success('Logout successful   ')
        router.push('/login')

    }
    const getUserDetails=async()=>{
       try{
         const res= await axios.get('/api/users/me')
         console.log(res.data);
         setUserDetails(res.data.data)
         setData(res.data.data?._id || null)
       }
       catch(error:any){
         toast.error(error?.response?.data?.error || "Failed to load user details")
       }
    }

    useEffect(() => {
      getUserDetails()
    }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Profile
        </h1>
        <hr/>
        <p>Profile Page</p>
        <h2>{data=='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data} </Link>}</h2>
        
        <div className="space-y-4">
          {/* Example placeholder for user info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">User Details</p>
            {userDetails ? (
              <pre className="mt-2 text-xs text-gray-700 whitespace-pre-wrap break-words">
                {JSON.stringify(userDetails, null, 2)}
              </pre>
            ) : (
              <p className="mt-2 text-sm text-gray-500">No user details loaded</p>
            )}
          </div>

          <button onClick={logout} className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200">
            Logout
          </button>
          <button onClick={getUserDetails} className="w-full py-2 px-4 bg-purple-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200">
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
}