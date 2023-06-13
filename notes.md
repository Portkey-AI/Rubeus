A way to implement load balancing could be to add a new endpoint - `/load-balanced/complete/`

with the following request payload
```json
{
  "options": [{
    "provider": "openai",
    "apiKeyName": "production1",
    "weight": 0.5,
    "params": {
      "prompt": "Name the top 10 buildings in Delhi.",
      "model": "text-davinci-002",
      "max_tokens": 250,
    }
  }, {
    "provider": "openai",
    "apiKeyName": "production2",
    "weight": 0.5,
    "params": {
      "prompt": "Name the top 10 buildings in Delhi.",
      "model": "text-davinci-002",
      "max_tokens": 250,
    }
  }]
}
```

Or a more condensed version like this:
```json
{
  "params": {
    "prompt": "Name the top 10 buildings in Delhi.",
    "model": "text-davinci-002",
    "max_tokens": 250,
  },
  "options": [{
    "provider": "openai",
    "apiKeyName": "production1",
    "weight": 0.5,
  }, {
    "provider": "openai",
    "apiKeyName": "production2",
    "weight": 0.5,
    "params": {
      "model": "text-davinci-002",
    }
  }]
}
```


or if we update the `/complete` endpoint payload from

```json
{
    "provider": "openai",
    "params": {
        "prompt": "What are the top 10 buildings in Delhi?",
        "max_tokens": 50,
        "user": "rohit@gmailcom"
    }
}
```

to something like this
```json
{
    "config": {
      "provider": "openai",
      "apiKeyName": "production1"
    },
    "params": {
        "prompt": "What are the top 10 buildings in Delhi?",
        "max_tokens": 50,
        "user": "rohit@gmailcom"
    }
}
```

which is a short form of 

```json
{
    "config": {
      "mode": "single",
      "options": {
        "provider": "openai",
        "apiKeyName": "production1",
      }
    },
    "params": {
        "prompt": "What are the top 10 buildings in Delhi?",
        "max_tokens": 50,
        "user": "rohit@gmailcom"
    }
}
```

we can add load balancing on top like this

```json
{
    "config": {
      "mode": "load_balanced",
      "options": [{
        "provider": "openai",
        "apiKeyName": "production1",
        "weight": 0.5
      }, {
        "provider": "openai",
        "apiKeyName": "production1",,
        "weight": 0.5,
        "params_to_override": {
          "model": "text-davinci-002"
        }
      }]
    },
    "params": {
        "prompt": "What are the top 10 buildings in Delhi?",
        "max_tokens": 50,
        "user": "rohit@gmailcom"
    }
}
```

fallback would look like

```json
{
    "config": {
      "mode": "fallback",
      "options": [{
        "provider": "openai",
        "apiKeyName": "production1"
      }, {
        "provider": "anthropic",
        "apiKeyName": "production2"
      }]
    },
    "params": {
        "prompt": "What are the top 10 buildings in Delhi?",
        "max_tokens": 50,
        "user": "rohit@gmailcom"
    }
}
```

retry would be

```json
{
    "config": {
      "mode": "retry",
      "options": [{
        "provider": "openai",
        "apiKeyName": "production1",
        "retry": {
          "attempts": 3,
          "onStatusCodes": [500, 502, 503, 504]
        }
      }]
    },
    "params": {
        "prompt": "What are the top 10 buildings in Delhi?",
        "max_tokens": 50,
        "user": "rohit@gmailcom"
    }
}
```

and I could combine retry & fallback like this

```json
{
    "providerSettings": {
      "mode": "fallback",
      "providers": [{
        "provider": "openai",
        "apiKeyName": "production1",
        "retry": {
          "attempts": 3,
          "onStatusCodes": [500, 502, 503, 504]
        }
      }, {
        "provider": "anthropic",
        "apiKeyName": "production2",
        "retry": {
          "attempts": 2,
          "onStatusCodes": [500, 502, 503, 504]
        }
      }]
    },
    "requestParams": {
        "prompt": "What are the top 10 buildings in Delhi?",
        "max_tokens": 50,
        "user": "rohit@gmailcom"
    }
}
```


