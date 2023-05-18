import { CohereBase } from "./llm/cohere/Cohere";
import { OpenAIBase, OpenAICompletionBody } from "./llm/openAI/OpenAI";


//create class called Rubeus
export class Rubeus {
    llm: string;
    apiKey: string;
    llmObject: any;
    //constructor
    constructor(llm: string, apiKey: string) {
        this.llm = llm
        this.apiKey = apiKey
        switch (this.llm) {
            case 'openai':
                this.llmObject = new OpenAIBase(this.apiKey)
                break;

            case 'cohere':
                this.llmObject = new CohereBase(this.apiKey)
                break;

            default:
                throw new Error('Invalid LLM type');
        }
    }


    async complete(params: OpenAICompletionBody) {
        return this.llmObject.complete(params)
    }

    // get(llm: string, apiKey: string) {
    //     this.llm = llm;
    //     return this.init();
    // }

    // init() {
    //     switch (this.llm) {
    //         case 'openai':
    //             return new OpenAIBase(this.apiKey)
    //             break;

    //         case 'cohere':
    //             return new CohereBase(this.apiKey)
    //             break;

    //         default:
    //             throw new Error('Invalid LLM type');
    //             break;
    //     }
    // }
}