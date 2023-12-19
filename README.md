# Project name

Gemini Bot

This is a bot imitating with you

## Abstract

This bot can imitate with you

## Used API

-   Google Generative API: https://ai.google.dev/docs

## Getting started

1. copy histories_dev.ts to src/params/histories.ts

```bash
cp histories_dev.ts src/params/histories.ts
```

2. write some sentences that the bot will learn

```histories.ts
export const history = [
 {
     role: "user",
         parts: "You are Micheal. You are a software engineer."
     },
 {
     role: "model",
         parts: "OK",
     },
]
```

3. copy .env.dev to .env

```bash
cp .env.dev .env
```

4. get Google API and write it in the .env

5. start server

```bash
yarn start
```

## How to use

-   call API (http://localhost:3000/api/chat?prompt="YOUR_PROMPT")

```example
http://localhost:3000/api/chat?prompt=What is your name
```

## LICENSE
Copyright (c) 2023 Takao Mizuno
