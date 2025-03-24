"use client"

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface iAppProps{
  text:string
}

export function SubmitButton({text}:iAppProps){
  const {pending} = useFormStatus()
  return (
    <>
    {pending?(
      <Button disabled className="w-full">Please Wait... <Loader2 className="animate-spin size-4 mr-2" /></Button>
    ):(
      <Button type="submit" className="w-full">{text}</Button>
    )}
    </>
  );
}