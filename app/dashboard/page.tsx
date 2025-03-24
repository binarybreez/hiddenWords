import { requireUser } from "@/lib/hooks"
import { AcceptingMessageSwitch } from "../components/AcceptingMessageSwitch"
import { CopyLink } from "../components/CopyLink"
import { isAcceptingMessage } from "../actions"

export default async function page() {
  const session = await requireUser()
  const response = await isAcceptingMessage()
  return (
    <div>
      <div className="md:mt-4 lg:flex items-center lg:justify-between w-full md:w-[80%] mx-auto ">
      <CopyLink username={session?.user.username as string} />
      <AcceptingMessageSwitch current={response.data}/>
      </div>
    </div>
  )
}

