import { VerifyForm } from "@/app/components/VerifyForm"
import { authorizeUser } from "@/lib/hooks"

export default async function page({params}:{params:Promise<{username:string}>}) {
  await authorizeUser()
  const {username} = await params
  return (
    <div className="w-screen h-screen flex items-center justify-center"><VerifyForm username={username} /></div>
  )
}

