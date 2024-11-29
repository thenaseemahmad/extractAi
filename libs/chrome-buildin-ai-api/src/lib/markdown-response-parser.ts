export interface IResponse{
    [key:string]: string;
}

export function parseToJsonViaRegex(response:string):IResponse {
    const jsonObj:IResponse = {};
    response = response.replace(/\*/g,'').replace(/,/g,'').replace(/"/g,'').replace(/'/g,'').replace(/`/g,'').trim();
    const lines = response.split('\n');
    const regex = /^([^:]+):([^:]+)$/; // Match a single "key:val" pair
    lines.forEach( (line)=>{
        const match = line.match(regex);
        if (match) {
            const key = match[1].trim(); // Extract and trim the key
            const value = match[2].trim(); // Extract and trim the value
            //Check if this key does not exist
            if(!(key in jsonObj)){
                jsonObj[key] = value; // Return as a JSON object
            }            
        }
    })
    return jsonObj
}