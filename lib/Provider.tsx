"use client"
import { ReactNode, useContext, useState } from "react";
import { UserMessage } from "./contexts";

export default function Provider({children}:{children:ReactNode}){
  const [userMessage,setUserMessage] = useState("")
  return (
    <UserMessage.Provider value={{userMessage,setUserMessage}}>{children}</UserMessage.Provider>
  );
}

export function useUserMessage(){
  return useContext(UserMessage)
}