# CMI 2026 GAME

A browser-based arcade learning platform inspired by CMI/Tessellate-style CS and math practice.

## Features

- Neon arcade homepage with saved progress
- How-it-works learning flow screen
- Topic selection cards
- Mini lessons before practice
- Topic-specific quiz rounds
- Mixed Challenge mode
- Timed multiple-choice gameplay with 3 lives
- Score, level, timer, progress, and feedback
- Explanations after each answer
- Results screen with accuracy, weakest topic, and revision suggestions
- Simple progress tracking with `localStorage`

## Game Flow

1. Start from the homepage.
2. Choose a topic or Mixed Challenge.
3. Read a short lesson.
4. Play an arcade quiz round.
5. Review score, accuracy, weak areas, and revision tips.
6. Retry the same topic, choose a new topic, or return home.

## Topics

- Logic
- Binary Numbers
- Algorithms
- Counting & Combinatorics
- Graph Theory Basics
- Pattern Recognition
- Mixed Challenge

## Run Locally

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Tech Stack

- HTML
- CSS
- JavaScript

## Future Improvements

- Importing real practice sets
- Sound effects
- Leaderboard
- Spaced revision mode
- Explanation library
- Exam simulator mode
