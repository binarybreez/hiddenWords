import { ReactNode } from "react";
import { Header } from "../components/Header";
import { requireUser } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default async function  DashboardLayout({children}:{children:ReactNode}){
  const session = await requireUser()
  return (
    <div className="w-screen min-h-screen bg-radial-[at_50%_75%] from-secondary via-zinc-800 to-primary to-90% py-4">
      <Header/>
      <div className=" mt-17 flex justify-between items-center px-6 md:justify-around">
        <h1 className=" text-secondary w-fit ">Welcome, <Badge variant={"secondary"} className="text-md" >{session?.user.username}</Badge></h1>
        <Label className="text-md text-secondary bg-transparent">Dashboard</Label>
      </div>
      {children}
    </div>
  );
}