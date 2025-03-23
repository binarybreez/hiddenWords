"use client"
import { Switch } from "@/components/ui/switch"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { changeAcceptingStatus, isAcceptingMessage } from "../actions"


export function AcceptingMessageSwitch({current}:{current:boolean}) {
  const [loading,setLoading] = useState(false)
  const [acceptStatus,setAcceptStatus] = useState(current)
  // console.log("acceptStatus",acceptStatus)
  const fetchMessageAcceptingStatus = useCallback(async()=>{
    setLoading(true)
    try {
      const response = await isAcceptingMessage()
      setAcceptStatus(response.data)
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch message accepting status",{description:"Please try again later"})
    } finally {
      setLoading(false)
    }
  },[setAcceptStatus])

  useEffect(()=>{
    fetchMessageAcceptingStatus()
  },[fetchMessageAcceptingStatus,setAcceptStatus])

  const handleSwitchChange = async()=>{
    try {
      await changeAcceptingStatus(acceptStatus)
      fetchMessageAcceptingStatus()
      toast.success('Prefference changed successfully')
    } catch (error) {
      console.log(error)
      toast.error("Error occured in Applying the change",{description:"Try again Later"})
    }
  }
  return (
    <div className="md:mt-7 mt-3 lg:mx-0 mx-auto flex items-center gap-5 border-secondary rounded-full px-3 py-1 border-2 w-fit">
      <h1 className="text-secondary font-semibold">Accepting Message: {acceptStatus?"On":"Off"}</h1>
      <Switch checked={acceptStatus} onCheckedChange={handleSwitchChange} disabled={loading} />
    </div>
  )
}
