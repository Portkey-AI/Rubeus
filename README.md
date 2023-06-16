<img src="/docs/images/header.png" width=2000/><br>

<p align="center">

  [![npm version](https://badge.fury.io/js/rubeus.svg)](https://badge.fury.io/js/rubeus)
[![Build Status](https://travis-ci.com/yourusername/rubeus.svg?branch=master)](https://travis-ci.com/yourusername/rubeus)
[![Coverage Status](https://coveralls.io/repos/github/yourusername/rubeus/badge.svg?branch=master)](https://coveralls.io/github/yourusername/rubeus?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📝 [Rubeus Docs](https://github.com/Portkey-AI/docs) 💻 [How to Contribute]()

</p>

```
todo

Please replace `yourusername` with your actual GitHub username and adjust the links as needed. The badges here are provided by services like [Fury](https://badge.fury.io/), [Travis CI](https://travis-ci.com/), [Coveralls](https://coveralls.io/), and [shields.io](https://shields.io/). You'll need to set up these services for your project to use these badges.

Note: These badges are for illustrative purposes, make sure to use the appropriate badges that reflect the actual status of your project.
```

---

### **Rubeus** is an intelligent tool that streamlines interactions with multiple Language Learning Model (LLM) providers. Just as Axios simplifies HTTP requests with its promise-based structure, Rubeus prvodies a unified API signature for interacting with all LLMs. 


## Rubeus Features

* 🌐 **Interoperability:** Write once, run with any provider. Switch between __ models from __ providers seamlessly.
* 🔀 **Fallback Strategies:** Don't let failures stop you. If one provider fails, Rubeus can automatically switch to another.
* 🔄 **Retry Strategies:** Temporary issues shouldn't mean manual re-runs. Rubeus can automatically retry failed requests.
* ⚖️ **Load Balancing:** Distribute load effectively across multiple API keys or providers based on custom weights.
* 📝 **Unified API Signature:** If you've used OpenAI, you already know how to use Rubeus with any other provider.

## Getting Started

```bash
npm install
npm run dev #To run on your local machine
npm run deploy #To run on your server
```

## Supported Providers

| Provider  | Support Status  | Supported Endpoints |
|---|---|---|
| <img src="/docs/images/openai.png" width=18> OpenAI | :heavy_check_mark: Supported  | `/completion`, `/embed` |
| <img src="/docs/images/anthropic.png" width=18> Anthropic  | :heavy_check_mark: Supported  | `/complete` |
| <img src="/docs/images/cohere.png" width=18> Cohere  | :heavy_check_mark: Supported  | `generate`, `embed` |
| <img src="/docs/images/bard.png" width=18> Google Bard  | :soon: Coming Soon  |  |
| <img src="/docs/images/localai.png" width=18> LocalAI  | :soon: Coming Soon  |  |

📢 [Follow us on Twitter](https://twitter.com/portkeyai) for new updates.

## Using Rubeus Features

### 1. 🌐 Interoperability
Rubeus allows you to switch between different language learning models from various providers, making it a highly flexible tool.
```javascript
// example code
```

### 2. 🔀 Fallback Strategies
In case one provider fails, Rubeus is designed to automatically switch to another, ensuring uninterrupted service.
```javascript
// example code
```

### 3. 🔄 Retry Strategies
Rubeus has a built-in mechanism to retry failed requests, eliminating the need for manual re-runs.
```javascript
// example code
```

### 4. ⚖️ Load Balancing
Manage your workload effectively with Rubeus's custom weight-based distribution across multiple API keys or providers.
```javascript
// example code
```

### 5. 📝 Unified API Signature
If you're familiar with OpenAI's API, you'll find Rubeus's API easy to use due to its unified signature.
```javascript
// example code
```

## API Documentation

- `Function1`: Description of the function, its parameters and return value.
- `Function2`: Description of the function, its parameters and return value.
- ...

## Built On Top Of Rubeus

| Name | Description |
| -- | -- |
| Portkey | Logs & monitoring for LLM apps 


## Roadmap

1. Support for more providers, including Google Bard and LocalAI.
2. Enhanced load balancing features to optimize resource use across different models and providers.
3. More robust fallback and retry strategies to further improve the reliability of requests.
4. Increased customizability of the unified API signature to cater to more diverse use cases.

[💡 Raise an issue to suggest a new feature](https://github.com/Portkey-AI/Rubeus/issues)

## Contribution Guidelines

Don't know where to start? Start with a *Good First Issue*!

## License

Rubeus is licensed under the MIT License. See the [LICENSE file](https://github.com/Portkey-AI/Rubeus/blob/worker/LICENSE) for more details.
