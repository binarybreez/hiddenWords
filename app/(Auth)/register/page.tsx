import { SignupForm } from "@/app/components/SignupForm";
import { authorizeUser } from "@/lib/hooks";


export default async function Register() {
  await authorizeUser()

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <SignupForm />
    </div>
  );
}
