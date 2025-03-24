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
import { RegisterUser } from "../actions";
import { signupSchema } from "@/models/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function SignupForm() {
  const [lastResult, action] = useActionState(RegisterUser, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Card className="w-[90%] md:w-[50%] lg:w-[30%] shadow-md hover:shadow-primary">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold text-center">
          Register here
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label>Username</Label>
            <Input
              name={fields.username.name}
              key={fields.username.key}
              placeholder="john_doe"
            />
            <p className="text-sm text-red-600 font-semibold">
              {fields.username.errors}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              name={fields.email.name}
              key={fields.email.key}
              defaultValue={fields.email.initialValue}
              placeholder="xyo8I@example.com"
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
              placeholder="********"
            />
            <p className="text-sm text-red-600 font-semibold">
              {fields.password.errors}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <SubmitButton text="Register" />
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/login"
            >
              Already a Member ?
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
