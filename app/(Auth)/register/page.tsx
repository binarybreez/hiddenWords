import { SignupForm } from "@/app/components/SignupForm";
import { authorizeUser } from "@/lib/hooks";


export default async function Register() {
  await authorizeUser()

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-tl from-cyan-300 via-secondary to-lime-300">
      <SignupForm />
    </div>
  );
}
