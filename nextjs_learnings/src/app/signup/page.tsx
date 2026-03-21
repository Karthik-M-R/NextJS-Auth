"use client";
import Link from 'next/link'
import React from "react"
import { useRouter } from 'next/navigation';
import { axios } from 'axios';

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })

  const onSignup = async () => {
    // Logic goes here
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 text-black">
      <div className="p-8 bg-white shadow-md rounded-lg flex flex-col w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Signup</h1>
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
          Signup
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline font-medium">Login here</Link>
        </p>
      </div>
    </div>
  );
}