"use client";

import axios from "axios";
import Link from "next/link";
import React,{useEffect,useState} from "react";

export default function VerifyEmailPage(){
    const[token, setToken] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);

   
        const verifyEmail = async () => {
         try {
                const response = await axios.post(
                    "/api/verifyemail", { token });
                setIsVerified(true);
            } catch (error: any) {
                setError(true);
                console.log(error.response.data)

            }

          
        };

            useEffect(() => {
                const urlToken=window.location.search.
                split("=")[1]
                setToken(urlToken || "");
           
        }, []);

        useEffect(() => {
            if(token.length>0)
            {
                verifyEmail();
            }
        }, [token]);

return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
        
        <h1 className="text-4xl font-bold mb-4">Verify Email</h1>
        
        <h2 className="p-2 bg-orange-500 text-black rounded-sm mb-4">
            {token ? `${token}` : "no token"}
        </h2>

        {isVerified && (
            <div className="text-center">
                <h2 className="text-2xl mb-2">Email Verified</h2>
                <Link href="/login" className="text-blue-500 hover:text-blue-400 transition-colors">
                    Login
                </Link>
            </div>
        )}

        {error && (
            <div className="text-center">
                <h2 className="text-2xl bg-red-500 text-black p-1 px-2 rounded">
                    Error verifying email
                </h2>
            </div>
        )}

    </div>
);

}