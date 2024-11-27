import { IResponse, parseApiResponseToJSON, parseToJsonViaRegex } from "./markdown-response-parser";

declare const window: any;
export function getResponseFromPromptApi(prompt: string): Promise<IResponse> {
    console.log(prompt)
    return new Promise((resolve, reject) => {
        (async () => {
            try {                
                const {available, defaultTemperature, defaultTopK, maxTopK } = await window.self.ai.languageModel.capabilities();
                if (available !== "no") {
                    const session = await window.self.ai.languageModel.create();                  
                    // Prompt the model and wait for the whole result to come back.
                    console.log("Getting response from build in Ai-model");
                    const response = await session.prompt(prompt);
                    console.log("Raw Response From Chrome: ", response)
                    const parsedResponse = parseToJsonViaRegex(response);
                    console.log("Parsed Response From Chrome: ", parsedResponse)
                    resolve(parsedResponse);
                  }
                  else{
                    reject(new Error("Your browser is not compatible, or cannot run Chrome-built-in AI models"))
                  }
            } catch (error) {                
                reject(error); 
            }
        })(); 
    });
}