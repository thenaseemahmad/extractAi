import { GoogleGenerativeAI } from "@google/generative-ai";
import { IResponse, parseToJsonViaRegex } from "@chrome-buildin-ai-naseem/chrome-buildin-ai-api";


export async function getResponseFromGoogleGeminiEngine(prompt:string): Promise<IResponse> {
  return new Promise((resolve, reject)=>{
    (async ()=>{
      try{
        const genAI = new GoogleGenerativeAI("**");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        resolve(parseToJsonViaRegex(result.response.text()));
      }catch(error){
        reject(error);
      }
    })();
  })
}
