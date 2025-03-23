import { LoginForm } from "@/app/components/LoginForm";
import { authorizeUser } from "@/lib/hooks";

export default async function Login() {
  await authorizeUser()
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
