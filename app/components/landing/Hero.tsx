import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center mt-14 p-3 md:w-4/5 mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-white">Anonymous Feedback. Honest <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-secondary to-lime-300">Conversations</span>.</h1>
      <p className="text-center text-secondary">Share your thoughts freely and get real feedback—no names, no pressure</p>
      <div className="flex gap-6 mt-7">
      <Link href="/register" className={`${buttonVariants()} animate-bounce`}>Try Now</Link>
      <Link href="/login" className={`${buttonVariants({variant:"outline"})} `}>Get Started</Link>
      </div>
    </div>
  )
}

