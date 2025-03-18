import {z} from "zod";

export const acceptMessageSchema = z.object({
  acceptMessages: z.boolean(),
}); 

export const messageSchema = z.object({
  message: z
    .string()
    .min(8, { message: "Message must be atleast 8 character" })
    .max(250, { message: "Message must be atmost 250 characters" }),
});

export const signinSchema = z.object({
  identifier: z.string().email({message: "Invalid email"}),
  password: z.string().min(8, {message: "Password must be atleast 8 characters"}),
});

export const usernameValidation = z
  .string()
  .min(3, "username must be atleast 3 characters")
  .max(20, "username must be atmost 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "username must contain only alphabets and numbers");

export const signupSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }),
});

export const verifySchema = z.object({
  verificationCode: z
    .string()
    .min(6, { message: "Verification code must be atleast 6 characters" }),
});