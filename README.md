# Who Wants to Be a Millionaire

A browser-based implementation of "Who Wants to Be a Millionaire" built with Next.js, TypeScript, Zustand, and SCSS.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** — full type coverage
- **Zustand** — state management
- **SCSS** (CSS Modules) — no CSS frameworks
- **ESLint** + Airbnb config — code quality
- **Jest** + React Testing Library — unit tests
- **Husky** — pre-commit (lint) + pre-push (tests) hooks

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd millionaire

# Install dependencies
npm install --legacy-peer-deps
```

### Running the App

```bash
# Development mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm run start
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |

## Game Rules

1. Answer 12 questions in sequence
2. Each question has at least 4 answer options
3. Select the correct answer to advance to the next question
4. A wrong answer ends the game — you keep the prize from your last correct answer
5. Answer all 12 questions correctly to win **$1,000,000**!

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Start screen
│   ├── game/page.tsx       # Game screen
│   └── result/page.tsx     # Result screen
├── components/
│   ├── ui/                 # Generic UI primitives
│   │   └── Button/
│   └── shared/             # Game-specific components
│       ├── AnswerOption/
│       ├── Question/
│       └── PrizeList/
├── config/
│   └── questions.json      # Game configuration (extensible)
├── hooks/
│   └── useGame.ts          # Game logic hook
├── store/
│   └── gameStore.ts        # Zustand state store
├── styles/
│   ├── globals.scss
│   └── _variables.scss
└── types/
    └── index.ts            # TypeScript interfaces
```

## Extending the Game Config

The game config (`src/config/questions.json`) supports:
- Any number of questions
- Any number of answer options per question
- Multiple correct answers per question

Example question with multiple correct answers:

```json
{
  "id": 13,
  "question": "Which of these are prime numbers?",
  "answers": [
    { "id": "A", "text": "2", "isCorrect": true },
    { "id": "B", "text": "4", "isCorrect": false },
    { "id": "C", "text": "7", "isCorrect": true },
    { "id": "D", "text": "9", "isCorrect": false }
  ],
  "prize": 2000000
}
```

## Deployment

The app is deployed on Vercel: [Live Demo](#)
