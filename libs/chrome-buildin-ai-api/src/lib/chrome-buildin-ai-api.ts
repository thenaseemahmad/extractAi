declare const window: any;
export function getResponseFromPromptApi(prompt: string): Promise<string> {
    console.log(prompt)
    return new Promise((resolve, reject) => {
        (async () => {
            try {                
                const {available, defaultTemperature, defaultTopK, maxTopK } = await window.self.ai.languageModel.capabilities();
                if (available !== "no") {
                    const session = await window.self.ai.languageModel.create();                  
                    // Prompt the model and wait for the whole result to come back.
                    console.log("Getting response from build in Ai-model");
                    const result = await session.prompt(prompt);
                    resolve(result);
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
