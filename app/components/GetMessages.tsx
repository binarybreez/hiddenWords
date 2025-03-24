"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDate } from "@/lib/helper";
import { Message } from "@/models/user.model";
import { Trash } from "lucide-react";
import mongoose from "mongoose";
import { useState } from "react";
import { deleteMessage } from "../actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface iAppProps {
  messages: Message[];
  userId: string;
}

export function GetMessages({ messages, userId }: iAppProps) {
  const [data, setData] = useState(messages);
  async function handleDelete(messageId: mongoose.Types.ObjectId) {
    const newData = data.filter((message) => message._id !== messageId)
    setData(newData);
    const response = await deleteMessage(userId, messageId);
    if (!response.success) {
      toast.error("Error in Deleting the Message.");
    }
    toast.success("Deleted Successfully");
  }
  return (
    <Card className="bg-gradient-to-tr from-blue-600 via-secondary to-red-600 shadow-md shadow-primary">
      <CardContent className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {data.map((message, index) => (
          <Card
            key={index}
            className="hover:scale-103 transition-all shadow-md hover:shadow-primary"
          >
            <CardHeader>
              <Button
                variant={"outline"}
                size="icon"
                onClick={() => handleDelete(message._id)}
              >
                <Trash className="cursor-pointer border hover:border-red-600 size-8 p-2 rounded-full hover:bg-gray-200 hover:text-red-600 hover:scale-105 transition shadow-md hover:shadow-primary" />
              </Button>
            </CardHeader>
            <CardContent>{message.content}</CardContent>
            <CardFooter className="text-muted-foreground">
              {formatDate(message.createdAt)}
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
