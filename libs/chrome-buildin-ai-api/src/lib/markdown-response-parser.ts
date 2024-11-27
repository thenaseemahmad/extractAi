export interface IResponse{
    [key:string]: string;
}

export function parseApiResponseToJSON(response:string):IResponse {
    // Split the response into lines and filter out irrelevant ones
    const lines = response.split('\n').filter(line => line.startsWith('*'));
    const jsonObject:IResponse = {};
  
    lines.forEach(line => {
      // Extract key and value using regex
      const match = line.match(/\*\*\s*(.*?):\s*(.*?)\s*\*\*/);
      if (match) {
        const key = match[1].trim(); // Extract key
        const value = match[2].trim(); // Extract value
        jsonObject[key] = value;
      }
    });
  
    return jsonObject;
  }

export function parseToJsonViaNaive(response:string):IResponse {
    const jsonObj:IResponse = {};
    response = response.replace('/*/g','');
    const lines = response.split('\n');
    lines.forEach( (line)=>{
        if(line.includes(':')){
            const key = line.split(':')[0].trim();
            const val = line.split(':')[1].trim();
            jsonObj[key] = val;
        }
    })
    return jsonObj
}


export function parseToJsonViaRegex(response:string):IResponse {
    const jsonObj:IResponse = {};
    response = response.replace(/\*/g,'').replace(/,/g,'').replace(/"/g,'').replace(/'/g,'');
    const lines = response.split('\n');
    const regex = /^([^:]+):([^:]+)$/; // Match a single "key:val" pair
    lines.forEach( (line)=>{
        const match = line.match(regex);
        if (match) {
            const key = match[1].trim(); // Extract and trim the key
            const value = match[2].trim(); // Extract and trim the value
            jsonObj[key] = value; // Return as a JSON object
        }
    })
    return jsonObj
}