import { connectDB } from "@/lib/DB";
import User from "@/models/user.model";
import { z } from "zod";

const usernameQuerySchema = z.object({
  username: z
    .string()
    .min(3, "username must be atleast 3 characters")
    .max(20, "username must be atmost 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "username must contain only alphabets and numbers"
    ),
});
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const {username} = queryParam
    const submission = 
    // const result = usernameQuerySchema.safeParse(queryParam);
    // if (!result.success) {
    //   const usernameErrors = result.error.format().username?._errors || [];
    //   return Response.json(
    //     {
    //       success: false,
    //       message:
    //         usernameErrors?.length > 0
    //           ? usernameErrors.join(", ")
    //           : "Invalid username",
    //     },
    //     { status: 400 }
    //   );
    // }
    // const { username } = result.data;
    const user = await User.findOne({ username, isVerified: true });
    if (user) {
      return Response.json({
        success: false,
        message: "Username not Available",
      });
    }
    return Response.json({ success: true, message: "Username Available" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error in checking username" });
  }
}
