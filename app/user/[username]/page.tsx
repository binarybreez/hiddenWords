import { Messageform } from "@/app/components/Messageform"
import { Suggestions } from "@/app/components/Suggestions"

export default async function page({params}:{params:Promise<{username:string}>}) {
  const {username} = await params
  return (
    <div>
      <Suggestions/>
      <Messageform username={username} />
    </div>
  )
}
