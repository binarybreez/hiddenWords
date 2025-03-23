"use client"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useActionState } from "react";
import { VerifyUser } from "../actions";
import {verifySchema} from "../../models/schema";
import {useForm} from "@conform-to/react"
import {parseWithZod} from "@conform-to/zod"
import { SubmitButton } from "./SubmitButton";
import { Card, CardContent } from "@/components/ui/card";

export function VerifyForm({ username }: { username: string }) {
  const [lastResult,action] = useActionState(VerifyUser,undefined)
  const [form,fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData,{schema:verifySchema})
    },
    shouldValidate:"onBlur",
    shouldRevalidate:"onInput"
  })
  return (
    <Card className="shadow-md hover:shadow-primary hover:scale-103 transition-all">
      <CardContent>
      <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate className="flex flex-col gap-3 items-center">
        <input type="hidden" value={username} name={fields.username.name} key={fields.username.key}/>
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} name={fields.otp.name} key={fields.otp.key}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-red-600 font-semibold">{fields.otp.errors}</p>
        <p className="text-muted-foreground ">Enter the 6 digit Verification Code Here.</p>
        <SubmitButton text="Verify" />
      </form>
      </CardContent>
    </Card>
  );
}
