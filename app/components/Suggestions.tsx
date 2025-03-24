"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { Loader2, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useUserMessage } from "@/lib/Provider";

export function Suggestions() {
  const [messages, setMessages] = useState<string[]>([]);
  const [showMessages, setShowMessages] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserMessage } = useUserMessage();
  const getSuggestedMessages = async () => {
    setLoading(true);
    const response = await axios.get("/api/suggestMessages");
    console.log(response);
    if (response.data.success === false) {
      toast.error(response.data.message);
      setShowMessages(false);
      setLoading(false);
      return;
    }
    setShowMessages(true);
    const messagesArray = response.data.message?.split("||");
    setMessages(messagesArray as string[]);
    setLoading(false);
  };
  return (
    <Card className="shadow-md hover:shadow-primary w-full md:w-[90%]">
      <CardHeader>
        <CardTitle className="flex items-center ">
          <h1 className="w-full text-center md:text-2xl">
            Conversation Starters
          </h1>
          {!showMessages ? (
            <Button onClick={getSuggestedMessages}>
              Get Suggestions{" "}
              {loading && <Loader2 className="size-4 animate-spin" />}{" "}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowMessages(false)}
              className="hover:text-red-600 hover:bg-gray-300 hover:scale-105 transition-all cursor-pointer"
            >
              <X />
            </Button>
          )}
        </CardTitle>
        <CardDescription className="text-center">
          Explore fun and thought-provoking questions to spark engaging
          conversations with others! These questions are designed to bring out
          interesting stories, creative thoughts, and friendly discussions.
        </CardDescription>
      </CardHeader>
      {showMessages && (
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {messages?.map((message, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-primary hover:scale-103 transition-all cursor-pointer"
              onClick={() => setUserMessage(message)}
            >
              <CardContent>{message}</CardContent>
            </Card>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
