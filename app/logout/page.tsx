"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import TwitterX from "@/components/TwitterX";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const LogoutPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true)
    try{
      await signOut({
        redirect: false
      })

      setTimeout(() => {
        setIsLoading(false)
        router.push('/')
        router.refresh()
      }, 700)


    }catch(err){
      toast.error('Failed to log out.')
    }
    
  };
  return (
    <div className="z-[999] absolute top-0 left-0 w-screen h-screen bg-slate-700 flex justify-center items-center">
      <div className="w-[320px] rounded-xl flex flex-col items-center gap-6 bg-black p-5">
        <TwitterX size="xs" color="lightGray" />

        <p className="text-sm text-neutral-500">
          <span className="font-semibold text-lg text-ligthGray">
            Log out of Twitter?
          </span>
          <br />
          You can always log back in at any <br />
          time. If you just want to switch <br />
          accounts, you can do that by adding <br />
          an existing account.
        </p>

        <Button label="Log out" whiteStyle fullWidth onClick={handleLogout} />
        <Button
          label="Cancel"
          outlineStyle
          fullWidth
          onClick={() => router.push("/")}
        />
      </div>
      {isLoading && <Loader message="Loggin out..." isForFullPage />}
    </div>
  );
};

export default LogoutPage;
