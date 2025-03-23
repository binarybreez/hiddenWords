import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/Auth";

export function Header() {
  return (
    <div className="flex items-center justify-center h-fit">
    <div className="fixed right-auto bg-white rounded-full w-[90%] md:w-2/3 shadow-md hover:shadow-primary hover:scale-103 transition-all flex items-center justify-between py-2 px-4 mx-auto top-4">
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="logo" width={45} height={45} />
        <h1 className="font-semibold text-2xl">
          Hidden
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary">
            Words
          </span>
        </h1>
      </div>
      <Button
      className="cursor-pointer"
        variant={"outline"}
        size={"icon"}
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        <LogOut />
      </Button>
    </div>
    </div>
  );
}
