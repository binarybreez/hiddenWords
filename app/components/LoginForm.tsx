"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { LoginUser } from "../actions";
import { signinSchema } from "@/models/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
export function LoginForm() {
  const [lastResult, action] = useActionState(LoginUser, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signinSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <Card className="w-[90%] md:w-[50%] lg:w-[30%] shadow-md hover:shadow-primary">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-semibold">
          Login here
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label>Email or username</Label>
            <Input
              name={fields.email.name}
              key={fields.email.key}
              defaultValue={fields.email.initialValue}
              placeholder="Email or username"
            />
            <p className="text-sm text-red-600 font-semibold">
              {fields.email.errors}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input
              name={fields.password.name}
              key={fields.password.key}
              defaultValue={fields.password.initialValue}
              placeholder="Password"
            />
            <p className="text-sm text-red-600 font-semibold">
              {fields.password.errors}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <SubmitButton text="Login" />
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/register"
            >
              New Here ?
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
