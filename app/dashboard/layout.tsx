import { ReactNode } from "react";
import { Header } from "../components/Header";
import { requireUser } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { GetMessages } from "../components/GetMessages";
import { connectDB } from "@/lib/DB";
import { User } from "@/models/user.model";

async function getUserMessages(userId:string){
  await connectDB()
  const user = await User.findById(userId)
  return user.message
}

export default async function  DashboardLayout({children}:{children:ReactNode}){
  const session = await requireUser()
  const data = await getUserMessages(session?.user.id as string)
  return (
    <div className="w-screen min-h-screen py-4 bg-gradient-to-br from-red-300 via-secondary to-blue-600 p-4">
      <Header/>
      <div className=" mt-17 flex justify-between items-center px-6 md:justify-around">
        <h1 className=" w-fit ">Welcome, <Badge className="text-md" >{session?.user.username}</Badge></h1>
        <Label className="text-md bg-transparent">Dashboard</Label>
      </div>
      {children}
      <div className="mt-5 p-3 "><GetMessages messages={data} userId={session?.user.id as string} /></div>
    </div>
  );
}