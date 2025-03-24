"use client";
import { Card, CardContent } from "@/components/ui/card";
import { SubmitButton } from "./SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "@/models/schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { SendMessage } from "../actions";
import { useActionState } from "react";
import { useUserMessage } from "@/lib/Provider";

export function Messageform({ username }: { username: string }) {
  const [lastResult, action] = useActionState(SendMessage, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: messageSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const { userMessage, setUserMessage } = useUserMessage();

  return (
    <Card className="shadow-md hover:shadow-primary md:w-[80%] mx-auto w-full">
      <form
        action={action}
        id={form.id}
        onSubmit={form.onSubmit}
        noValidate
        className="flex flex-col gap-4"
      >
        <CardContent>
          <input
            type="hidden"
            name={fields.To.name}
            key={fields.To.key}
            value={username}
          />
          <Textarea
            placeholder="Write your Message Here..."
            name={fields.message.name}
            key={fields.message.key}
            value={userMessage}
            onChange={(e)=>setUserMessage(e.target.value)}
          />
          <p className="text-red-600 text-sm font-semibold">
            {fields.message.errors}
          </p>
        </CardContent>
        <div className="w-[60%] md:w-[40%] mx-auto">
          <SubmitButton text={`Send Message to ${username}`} />
        </div>
      </form>
    </Card>
  );
}
