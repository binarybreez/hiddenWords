import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(`${process.env.AI_API_KEY}`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
    "Generate four open-ended, engaging, and universally appealing questions suitable for an anonymous social messaging platform. The questions should encourage friendly interaction and meaningful conversation. Avoid personal, sensitive, or controversial topics. Focus on universal themes such as hobbies, life experiences, creativity, or general curiosity. The questions should be thought-provoking and inclusive of a diverse audience. Each question should be separated by '||'.";
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
}
