# Setup

- Clone the repository `git clone <your_link>`
- Open in your IDE and in your terminal, give the following instructions:
    - `npm i`
    - `npm run dev`

# Game Instructions
In Shiritori:
- Players take turns entering words, where each new word must begin with the last letter of the previous word.
- Words cannot be repeated, and they must be valid English words.
- If a player fails to enter a correct word, they lose a point.





# Feature Requirements and Scoring

| Feature | Points | Details |
| --- | --- | --- |
| Turn based Game Play | 20 | Automatically move to the other player when one player finishes his turn |
| Word Meaning Validation | 20 | Validate words using DictionaryAPI or any other API |
| Word Structure Validation | 10 | Validate word starting with last letter of the previous word, minimum 4 letters, and can not be repeated |
| Countdown Feature | 10 | Implement a countdown timer for each player’s turn. |
| Score Tracking | 10 | Track each player’s score based on correct or incorrect words and timings |
| Word History Display | 10 | Display all previously entered words to avoid repetition. |
| Code Quality | 10 | Ensure code readability, organization, and adherence to best practices. |
| Hosting | 5 | Deploy the game to a hosting platform (Netlify, Vercel) |
| Documentation | 5 | Include a clear GitHub README explaining setup, usage, and gameplay instructions. |
Ensure code readability, organization, and adherence to best practices.
- [ ] Hosting | 5  | Deploy the game to a hosting platform (Netlify, Vercel)
- [x] Documentation | 5  | Include a clear GitHub README explaining setup, usage, and gameplay instructions.


## Turn based Game Play
- [ ] Automatically move to the other player when one player finishes his turn
    - [ ] Enter & highlight the player's turn
    - [ ] 






This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
