import { Messageform } from "@/app/components/Messageform"
import { Suggestions } from "@/app/components/Suggestions"

export default async function page({params}:{params:Promise<{username:string}>}) {
  const {username} = await params
  return (
    <div className="p-4 flex flex-col items-center pt-18 md:pt-26 gap-6 md:gap-10 bg-gradient-to-tr from-blue-600 via-secondary to-red-600 min-h-screen min-w-screen">
      <Suggestions/>
      <Messageform username={username} />
    </div>
  )
}
