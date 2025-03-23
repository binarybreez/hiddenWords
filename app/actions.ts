/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { signIn } from "@/lib/Auth";
import { connectDB } from "@/lib/DB";
import { requireUser } from "@/lib/hooks";
// import { requireUser } from "@/lib/hooks";
import {
  messageSchema,
  signinSchema,
  signupSchema,
  verifySchema,
} from "@/models/schema";
import User from "@/models/user.model";
import { parseWithZod } from "@conform-to/zod";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
export async function RegisterUser(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, { schema: signupSchema });
  if (submission.status != "success") {
    return submission.reply();
  }
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  await connectDB();
  const hashedpassword = await hash(submission.value.password, 10);
  await User.create({
    username: submission.value.username,
    email: submission.value.email,
    password: hashedpassword,
    verificationCode: verificationCode,
    verificationCodeExpiry: new Date(Date.now() + 10 * 60 * 1000),
    isVerified: false,
    isAcceptingMessage: false,
    message: [],
  });
  return redirect(`/verify/${submission.value.username}`);
}

export async function LoginUser(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, { schema: signinSchema });
  if (submission.status != "success") {
    return submission.reply();
  }
  console.log(submission.value);
  const email = submission.value.email;
  const password = submission.value.password;
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}

export async function VerifyUser(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, { schema: verifySchema });
  if (submission.status != "success") {
    return submission.reply();
  }
  await connectDB();
  const user = await User.findOne({ username: submission.value.username });
  const isCodeCorrect = submission.value.otp === user.verificationCode;
  const isCodeValid = new Date(user.verificationCodeExpiry) > new Date();
  if (isCodeValid && isCodeCorrect) {
    user.isVerified = true;
    await user.save();
  }
  redirect("/login");
}

export async function SendMessage(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, { schema: messageSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }
  await connectDB();
  const user = await User.findOne({ username: submission.value.To });
  user.message.push(submission.value.message);
}

export async function isAcceptingMessage() {
  const session = await requireUser();
  try {
    await connectDB();
    const user = await User.findById(session?.user.id);
    return { data: user.isAcceptingMessage, success: true };
  } catch (error) {
    console.log(error);
    return {
      data: "Error occured in fetching the accepting state",
      success: false,
    };
  }
}

export async function changeAcceptingStatus(current:boolean) {
  try {
    const session = await requireUser();
    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(session?.user.id, {
      isAcceptingMessage: !current,
    },{new:true});
    // console.log(updatedUser)
    return { success: true , data:updatedUser.isAcceptingMessage};
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
