import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export function Header() {
  return (
    <div className="bg-white rounded-full w-[95%] md:w-2/3 shadow-md hover:scale-103 transition-all flex items-center justify-between py-2 px-4 mx-auto">
            <div className="flex gap-2 items-center">
              <Image src="/logo.svg" alt="logo" width={45} height={45} className="hidden md:block" />
              <h1 className="font-semibold text-3xl">
                Hidden
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-primary via-zinc-600 to-secondary">
                  Words
                </span>
              </h1>
            </div>
            <Link href="/login" className={buttonVariants()}>Get Started</Link>
          </div>
  )
}

