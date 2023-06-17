<img src="/docs/images/header.png" width=2000>

<div align="center">
  
<!--[![npm version](https://badge.fury.io/js/rubeus.svg)](https://badge.fury.io/js/rubeus)
[![Build Status](https://travis-ci.com/yourusername/rubeus.svg?branch=master)](https://travis-ci.com/yourusername/rubeus)
[![Coverage Status](https://coveralls.io/repos/github/yourusername/rubeus/badge.svg?branch=master)](https://coveralls.io/github/yourusername/rubeus?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) -->

📝 [**Use Rubeus**](#using-rubeus-features) 💻 [**How to Contribute**](#contribution-guidelines)

</div>

---

### **Rubeus** is an intelligent tool that streamlines interactions with multiple Language Learning Model (LLM) providers. Just as Axios simplifies HTTP requests with its promise-based structure, Rubeus provdies a unified API signature for interacting with all LLMs. 


## Rubeus Features

* 🌐 **Interoperability:** Write once, run with any provider. Switch between __ models from __ providers seamlessly.
* 🔀 **Fallback Strategies:** Don't let failures stop you. If one provider fails, Rubeus can automatically switch to another.
* 🔄 **Retry Strategies:** Temporary issues shouldn't mean manual re-runs. Rubeus can automatically retry failed requests.
* ⚖️ **Load Balancing:** Distribute load effectively across multiple API keys or providers based on custom weights.
* 📝 **Unified API Signature:** If you've used OpenAI, you already know how to use Rubeus with any other provider.

## Getting Started

```bash
npm install
npm run dev # To run locally
npm run deploy # To deploy to cloudflare
```

The local server runs on `http://localhost:8787` by default that is the base url for all requests.

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
Rubeus allows you to switch between different language learning models from various providers, making it a highly flexible tool. The following example shows a request to `openai`, but you could change the provider name to `cohere`, `anthropic` or others and Rubeus will automatically handle everything else.
```bash
curl --location 'http://127.0.0.1:8787/complete' \
--header 'Content-Type: application/json' \
--data-raw '{
    "config": {
        "provider": "openai"
    },
    "params": {
        "prompt": "What are the top 10 happiest countries in the world?",
        "max_tokens": 50,
        "model": "text-davinci-003",
        "user": "jbu3470"
    }
}'
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

[💬 Participate in Roadmap discussions here.](https://github.com/Portkey-AI/Rubeus/issues)

## Contribution Guidelines

* Checkout *Good First Issue* to start contributing!
* Bug Report? File here.
* Feature Request? File here.
* Reach out to the developers directly: [Rohit](https://twitter.com/jumbld) | [Ayush](https://twitter.com/ayushgarg_xyz)

## License

Rubeus is licensed under the MIT License. See the [LICENSE file](https://github.com/Portkey-AI/Rubeus/blob/worker/LICENSE) for more details.
