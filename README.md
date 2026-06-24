# CMI 2026 GAME

A browser-based arcade learning platform inspired by CMI/Tessellate-style CS and math practice.

## Features

- Neon arcade homepage with saved progress
- How-it-works learning flow screen
- Topic selection cards
- Pre-game survey for confidence, focus, and round length
- Mini lessons before practice
- Lessons with key ideas, common mistakes, examples, and exam-style tips
- Topic-specific quiz rounds
- Mixed Challenge mode
- Timed multiple-choice gameplay with 3 lives
- Score, level, timer, progress, and feedback
- Explanations after each answer
- Review Your Answers section after each quiz
- Results screen with accuracy, weakest topic, and revision suggestions
- Smart revision mode for weak areas
- Practice Weak Topics mode
- Expanded progress tracking with `localStorage`

## Game Flow

1. Start from the homepage.
2. Choose a topic or Mixed Challenge.
3. Complete a short survey about confidence, focus, and round length.
4. Read a short lesson with mistakes and exam-style tips.
5. Play an arcade quiz round.
6. Review score, accuracy, weak areas, explanations, and revision tips.
7. Retry the same topic, practice weak topics, choose a new topic, or return home.

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

## Progress Tracking

The app stores simple local progress in `localStorage`:

- Best score
- Games played
- Best accuracy
- Last selected topic
- Total questions answered
- Total correct answers
- Topic-wise attempts
- Topic-wise correct answers

## Future Improvements

- Importing real practice sets
- Sound effects
- Leaderboard
- Spaced revision mode
- Explanation library
- Exam simulator mode
