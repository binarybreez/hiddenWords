import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDate } from "@/lib/helper";
import { Message } from "@/models/user.model";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteMessage } from "../actions";

interface iAppProps {
  messages: Message[];
  userId: string;
}

export function GetMessages({ messages, userId }: iAppProps) {
  return (
    <Card className="bg-gradient-to-tr from-blue-600 via-secondary to-red-600 shadow-md shadow-primary">
      <CardContent className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {messages.map((message, index) => (
          <Card
            key={index}
            className="hover:scale-103 transition-all shadow-md hover:shadow-primary"
          >
            <CardHeader>
              <Button variant={"ghost"} onClick={async()=>{
                "use server"
                await deleteMessage(userId,message._id)}
                } size="icon" className="cursor-pointer border hover:border-red-600 hover:bg-gray-200 hover:text-red-600 hover:scale-105 transition shadow-md hover:shadow-primary">
                <Trash className=" size-8 p-2 rounded-full " />
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
