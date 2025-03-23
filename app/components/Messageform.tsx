import { Card,CardHeader ,CardTitle,CardDescription,CardContent} from "@/components/ui/card";
import { SubmitButton } from "./SubmitButton";


export function Messageform({username}:{username:string}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Send Message to {username}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <form action="">
        <CardContent></CardContent>
        <div className="w-[60%] md:w-[40%] mx-auto">
        <SubmitButton text="Send Message" />
        </div>
        </form>
      </Card>
    </div>
  )
}

