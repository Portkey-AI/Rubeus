```
npm install
npm run dev
```

```
npm run deploy
```

## Folder Structure
```
myProject/
│
├── src/
│   ├── providerConfigs/
│   │   ├── index.ts            // export all provider configurations here
│   │   ├── anthropicConfig.ts
│   │   ├── cohereConfig.ts
│   │   ├── replicateConfig.ts
│   │   ├── huggingFaceConfig.ts
│   │   ├── types.ts            // Define your ProviderConfig and ProviderParameterConfig types here
│   │
│   ├── types/
│   │   ├── requestBody.ts      // Define your RequestBody type here
│   │
│   ├── services/
│   │   ├── transformToProviderRequest.ts
│   │
│   ├── app.ts                  // Main application file
│
├── test/
│   ├── ...                     // Tests files
│
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```