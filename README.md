<img src="/docs/images/header.png" width=2000>

<div align="center">
  
<!--[![npm version](https://badge.fury.io/js/rubeus.svg)](https://badge.fury.io/js/rubeus)
[![Build Status](https://travis-ci.com/yourusername/rubeus.svg?branch=master)](https://travis-ci.com/yourusername/rubeus)
[![Coverage Status](https://coveralls.io/repos/github/yourusername/rubeus/badge.svg?branch=master)](https://coveralls.io/github/yourusername/rubeus?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) -->

</div>

**Rubeus** is an unopionionated edge worker for buliding with Large Language Models (LLMs). Catering to a range of LLM providers, Rubeus extends beyond a unified API, becoming a powerful ally that expertly handles retries, fallbacks, and load distribution. The essence of Rubeus isn't merely about initiating requests—it's about ensuring these requests are handled intelligently and efficiently. With Rubeus, you're harnessing the power of language models, Axios-style! 💼🚀 

- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Interoperability](#-interoperability)
  - [Fallback Strategies](#-fallback-strategies)
  - [Retry Strategies](#-retry-strategies)
  - [Load Balancing](#%EF%B8%8F-load-balancing)
  - [Unified API Signature](#-unified-api-signature)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)


### Key Features

* 🌐 **Interoperability:** Write once, run with any provider. Switch between __ models from __ providers seamlessly.
* 🔀 **Fallback Strategies:** Don't let failures stop you. If one provider fails, Rubeus can automatically switch to another.
* 🔄 **Retry Strategies:** Temporary issues shouldn't mean manual re-runs. Rubeus can automatically retry failed requests.
* ⚖️ **Load Balancing:** Distribute load effectively across multiple API keys or providers based on custom weights.
* 📝 **Unified API Signature:** If you've used OpenAI, you already know how to use Rubeus with any other provider.
<br><br>
### Supported Providers

| Provider  | Support Status  | Supported Endpoints |
|---|---|---|
| <img src="/docs/images/openai.png" width=18> OpenAI | :heavy_check_mark: Supported  | `/completion`, `/embed` |
| <img src="/docs/images/anthropic.png" width=18> Anthropic  | :heavy_check_mark: Supported  | `/complete` |
| <img src="/docs/images/cohere.png" width=18> Cohere  | :heavy_check_mark: Supported  | `generate`, `embed` |
| <img src="/docs/images/bard.png" width=18> Google Bard  | :soon: Coming Soon  |  |
| <img src="/docs/images/localai.png" width=18> LocalAI  | :soon: Coming Soon  |  |

<br>
### Getting Started

```bash
npm install
npm run dev # To run locally
npm run deploy # To deploy to cloudflare
```

The local server runs on `http://localhost:8787` by default that is the base url for all requests.

## Usage

### 🌐 Interoperability
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

### 🔀 Fallback Strategies
In case one provider fails, Rubeus is designed to automatically switch to another, ensuring uninterrupted service.

```bash
# Fallback to anthropic, if openai fails (This API will use the default text-davinci-003 and claude-v1 models)
curl --location 'http://127.0.0.1:8787/complete' \
--header 'Content-Type: application/json' \
--data-raw '{
    "config": {
        "mode": "fallback",
        "options": [
          {"provider": "openai"}, 
          {"provider": "anthropic"}
        ]
    },
    "params": {
        "prompt": "What are the top 10 happiest countries in the world?",
        "max_tokens": 50,
        "user": "jbu3470"
    }
}'

# Fallback to gpt-3.5-turbo when gpt-4 fails
curl --location 'http://127.0.0.1:8787/complete' \
--header 'Content-Type: application/json' \
--data-raw '{
    "config": {
        "mode": "fallback",
        "options": [
          {"provider": "openai", "params_to_override": {"model": "gpt-4"} }, 
          {"provider": "anthropic", "params_to_override": {"model": "gpt-3.5-turbo"} }
        ]
    },
    "params": {
        "messages": {"role": "user", "content": "What are the top 10 happiest countries in the world?"},
        "max_tokens": 50,
        "user": "jbu3470"
    }
}'
```

### 🔄 Retry Strategies
Rubeus has a built-in mechanism to retry failed requests, eliminating the need for manual re-runs.
```bash
# Add the retry configuration to enable exponential back-off retries
curl --location 'http://127.0.0.1:8787/complete' \
--header 'Content-Type: application/json' \
--data-raw '{
    "config": {
        "mode": "single",
        "options": [{
            "provider": "openai",
            "retry": {
                "attempts": 3,
                "onStatusCodes": [429,500,504,524]
            }
        }]
    },
    "params": {
        "prompt": "What are the top 10 happiest countries in the world?",
        "max_tokens": 50,
        "model": "text-davinci-003",
        "user": "jbu3470"
    }
}'
```

### ⚖️ Load Balancing
Manage your workload effectively with Rubeus's custom weight-based distribution across multiple API keys or providers.
```bash
# Load balance 50-50 between gpt-3.5-turbo and claude-v1
curl --location 'http://127.0.0.1:8787/complete' \
--header 'Content-Type: application/json' \
--data '{
    "config": {
        "mode": "loadbalance",
        "options": [{
            "provider": "openai",
            "weight": 0.5,
            "params_to_override": { "model": "gpt-3.5-turbo" }
        }, {
            "provider": "anthropic",
            "weight": 0.5,
            "params_to_override": { "model": "claude-v1" }
        }]
    },
    "params": {
        "messages": {"role": "user","content":"What are the top 10 happiest countries in the world?"},
        "max_tokens": 50,
        "user": "jbu3470"
    }
}'
```

### 📝 Unified API Signature
If you're familiar with OpenAI's API, you'll find Rubeus's API easy to use due to its unified signature.
```bash
# OpenAI query
curl --location 'http://127.0.0.1:8787/complete' \
--header 'Content-Type: application/json' \
--data-raw '{
    "config": {
        "provider": "openai"
    },
    "params": {
        "prompt": "What are the top 10 happiest countries in the world?",
        "max_tokens": 50,
        "user": "jbu3470"
    }
}'

# Anthropic Query
curl --location 'http://127.0.0.1:8787/complete' \
--header 'Content-Type: application/json' \
--data-raw '{
    "config": {
        "provider": "anthropic"
    },
    "params": {
        "prompt": "What are the top 10 happiest countries in the world?",
        "max_tokens": 50,
        "user": "jbu3470"
    }
}'
```

## Built with Rubeus

| Name | Description |
| -- | -- |
| Portkey | Logs & monitoring for LLM apps 


## Roadmap

1. Support for more providers, including Google Bard and LocalAI.
2. Enhanced load balancing features to optimize resource use across different models and providers.
3. More robust fallback and retry strategies to further improve the reliability of requests.
4. Increased customizability of the unified API signature to cater to more diverse use cases.

[💬 Participate in Roadmap discussions here.](https://github.com/Portkey-AI/Rubeus/issues)

## Contributing

* Checkout *Good First Issue* to start contributing!
* Bug Report? File here.
* Feature Request? File here.
* Reach out to the developers directly: [Rohit](https://twitter.com/jumbld) | [Ayush](https://twitter.com/ayushgarg_xyz)

## License

Rubeus is licensed under the MIT License. See the [LICENSE file](https://github.com/Portkey-AI/Rubeus/blob/worker/LICENSE) for more details.
