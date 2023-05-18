// let a:string = "hello";
// console.log(a);

import { Rubeus } from "./Rubeus";
console.log(Rubeus)



async function main() {
    let rubeus = new Rubeus('cohere', 'sk-1234');


        const output = await rubeus.complete(
        {
        model: 'davinci-instruct-beta',
        prompt: 'Once upon as time'
    });
    console.log("OPEN", openai)
    
    
}




main()








// // const options = {
// //     llm: 'openai',
// //     apiKey: 'sk-1234'
// // }

// // const params = {
// //     model: 'davinci',
// //     prompt: 'Once upon a time'
// // }

// // const output = await rubeus.complete(options, params);




