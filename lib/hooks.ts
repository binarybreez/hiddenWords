import { redirect } from "next/navigation";
import { auth } from "./Auth";

export async function requireUser(){
  const session = await auth()
  if(!session?.user){
    redirect("/login")
  }
  return session
}

export async function authorizeUser(){
  const session = await auth()
  if(session?.user){
    redirect("/dashboard")
  }
}