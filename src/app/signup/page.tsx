"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { LiaGithub } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { authClient, signIn } from "@/src/lib/auth-client"; // আপনার প্রজেক্টের সঠিক পাথ নিশ্চিত করুন
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  

  const [showPassword, setShowPassword] = useState(false);
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ ফর্ম সাবমিটের জন্য রিয়্যাক্ট ১৯+ এর পারফেক্ট এবং সঠিক টাইপ
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const loadingToast = toast.loading("Creating your account...");

    await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/signin", 
      },
      {
        onSuccess: (ctx) => {
          toast.dismiss(loadingToast);
          toast.success(`Welcome, ${formData.name}!`);
          
          // Better-Auth অটো-লগইন করে দেয়, তাই সরাসরি ড্যাশবোর্ডে রিডাইরেক্ট
          setTimeout(() => {
            router.push("/"); 
          }, 1500);
          
        },
        onError: (ctx) => {
          toast.dismiss(loadingToast);
          toast.error(ctx.error.message || "Signup failed.");
        }
      }
    );
  };

  const handelGoogleSignin = async ()=>{
const data = await signIn.social({
  provider: "google"
})
  };
  const handleGithubSignin = async ()=>{
    const data = await signIn.social({
      provider: "github"
    })
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md border border-gray-100">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              অ্যাকাউন্ট তৈরি করুন
            </h2>
            <p className="text-center"> বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  নাম
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                 ইমেইল
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Input with Visibility Toggle */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                অ্যাকাউন্ট তৈরি করুন
              </button>
            </div>
            <div className="flex items-center">
            <hr className="flex-1" />
            <p>অথবা</p>
            <hr className="flex-1"/>
            </div>
          </form>
            <div className="flex gap-2 justify-center">
              <p onClick={handelGoogleSignin} className="flex text-xs gap-1 border border-slate-500 p-3 rounded-2xl"> <FcGoogle/> Google দিয়ে চালিয়ে যান</p>
              <p onClick={handleGithubSignin} className="flex text-xs gap-1 border border-slate-500 p-3 rounded-2xl"> <LiaGithub/> GitHub দিয়ে চালিয়ে যান</p>
            </div>
            <div className="flex gap-1 justify-center">

            <p>অ্যাকাউন্ট আছে?</p>
                            <Link href="/signin" className="text-green-500 underline"> সাইন ইন করুন </Link>
            </div>
        </div>

      </div>
      <div className="text-center mt-10">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </div>

    </>
  );
}
