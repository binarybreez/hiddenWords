import { createContext } from "react";

export type userMessageContextType = {
  userMessage: string;
  setUserMessage: (c: string) => void;
};

export const UserMessage = createContext<userMessageContextType>({
  userMessage: "",
  setUserMessage: () => {},
});
