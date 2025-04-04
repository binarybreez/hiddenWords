"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {toast} from "sonner"

export function CopyLink({username}:{username:string}) {
  const profileURL=`https://hidden-words-snowy.vercel.app/user/${username}`
  const copyLink = () => {
    navigator.clipboard.writeText(profileURL)
    toast.success("Link Copied Successfully.")
  };
  return (
    <div className="flex flex-col gap-2 w-full md:w-fit ">
      <div className="flex items-center justify-between mt-5">
        <Label className=" bg-transparent text-md">
          Your Link
        </Label>
        <Button variant={"outline"} className="cursor-pointer md:hidden" >Copy</Button>
      </div>
      <div className="flex items-center bg-secondary md:w-fit rounded-full">
      <Input
        readOnly
        value={`hidden-words-snowy.vercel.app/user/${username}`}
        className=" bg-secondary md:w-xl w-full rounded-full"
        />
        <Button className="hidden md:block rounded-full" onClick={copyLink}>Copy</Button>
        </div>
    </div>
  );
}
