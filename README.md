# NOTE: This library is WIP and is not NOT complete yet.

# Axios for LLMs

This repository contains a Node.js library and a tool layer that provide a unified interface for different LLM APIs: OpenAI, Cohere, etc. The library provides methods for generating completions, embeddings and all other capabilities from LLM APIs. The tool layer allows users to integrate external APIs and use them with LLMs.

## Installation

To install the library, you can use npm:

```bash
# Node.js
npm install Rubeus
```

## Code Samples

### Using generations
```bash
# Node.js
import {Rubeus} from "rubeus"

// configure llm and its options

const llm = "openai";

const options = {
  model = <enterModel>,
  prompt = <enterPrompt>
}
  
const openaiOutput = await Rubeus.generate(llm, options);
```
You can switch different llms without worrying about their request parameters. For eg: to use cohere, simply use llm = "cohere" in the above code.

### Using Tools
```bash
# Node.js
import {RubeusTools} from "rubeus"

const tool = "googleSearch";

const options = { 
   inputParams: { //input Params as execpted the by tool
      "q" = <enter search query for google search>
   }
}

const googleSearchOutput = await RuebusTools.run(tool, options);

```

## Contributing

If you want to contribute to this repository, you can fork it and submit a pull request. Please make sure to write tests and follow the code style guidelines.

## License

This repository is licensed under the MIT License.
