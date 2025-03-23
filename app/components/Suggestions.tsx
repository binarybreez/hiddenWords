import { Card,CardHeader ,CardTitle,CardDescription,CardContent} from "@/components/ui/card";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function Suggestions(){
  try {
    const genAI = new GoogleGenerativeAI(`${process.env.AI_API_KEY}`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    const result = await model.generateContent(prompt);
    if (result.response && result.response.candidates) {
      return Response.json({
        status: 201,
        message: result.response.candidates[0].content.parts[0].text,
        success: true,
      });
    } else {
      return Response.json({
        status: 500,
        message: "Server error in generating messages",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 500,
      message: "Server error in generating messages",
      success: false,
    });
  }
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>AI Suggesttions to Start...</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Card>
            <CardContent></CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}