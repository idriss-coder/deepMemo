// useGameplayArea.ts
import { useState, useEffect, useCallback } from "react";
import { useVerses } from "@/hooks/useVerses";
import {Verset} from "@/lib/db";

/**
 * Each quiz item in the game:
 * - `target`: the correct verse
 * - `outputsOptions`: the 4 possible answers
 * - `userAnswer`: the user’s pick
 * - `isCorrect`: whether the user’s pick was correct
 */
export interface QuizItem {
    id: number;               // question index (0-based or otherwise)
    target: Verset;            // the "correct" verse for this question
    outputsOptions: Verset[];  // set of 4 possible answers
    userAnswer: Verset | null; // what the user selected
    isCorrect: boolean;       // was their answer correct?
}

/** A utility function to shuffle an array in-place (Fisher–Yates). */
function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Given a correct verse and the full list of verses,
 * returns 4 options: (the correct verse + 3 random distinct incorrect ones).
 */
function getRandomOptions(correct: Verset, allVerses: Verset[]): Verset[] {
    const others = allVerses.filter((v) => v.id !== correct.id);
    // Randomly pick 3 incorrect
    const randomIncorrect = shuffle(others).slice(0, 3);
    // Combine correct with 3 incorrect, then shuffle
    return shuffle([correct, ...randomIncorrect]);
}

export function useGameplayArea() {
    const { myVerses } = useVerses(); // from your existing hook

    const [quizData, setQuizData] = useState<QuizItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [completed, setCompleted] = useState<boolean>(false);
    const [wrongAnswers, setWrongAnswers] = useState<QuizItem[]>([]);

    /**
     * Build initial quiz data when `myVerses` changes.
     * Adjust the slicing (or random selection) logic as you like.
     */
    useEffect(() => {
        if (!myVerses || myVerses.length === 0) return;

        // Example: limit to first 10 verses (or shuffle them before slicing, etc.)
        const selected = myVerses.slice(0, 10);

        const newQuiz = selected.map((verse, index) => {
            const options = getRandomOptions(verse, selected);
            return {
                id: index,
                target: verse,
                outputsOptions: options,
                userAnswer: null,
                isCorrect: false,
            };
        })

        setQuizData(newQuiz);
        setCurrentIndex(0);
        setCompleted(false)
        setWrongAnswers([])
    }, [myVerses])

    /**
     * Handle the user selecting an answer.
     * We mark the question's userAnswer and whether it's correct.
     */
    const handleAnswer = useCallback(
        (selectedOption: Verset) => {
            setQuizData((prev) => {
                const updated = [...prev];
                const current = updated[currentIndex];
                if (current) {
                    current.userAnswer = selectedOption;
                    current.isCorrect = selectedOption.id === current.target.id;
                }
                return updated;
            });
        },
        [currentIndex]
    );

    /**
     * Proceed to the next question. If at the end, optionally re-inject missed questions.
     */
    const nextQuestion = useCallback(() => {
        setQuizData((prev) => {
            const current = prev[currentIndex];
            if (current && !current.isCorrect) {
                setWrongAnswers((old) => [...old, current]);
            }
            return prev;
        });

        // Move to the next question, or handle completion
        if (currentIndex < quizData.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            // If we have missed questions, re-queue them
            if (wrongAnswers.length > 0) {
                setQuizData((prev) => {
                    const extraQuestions = wrongAnswers.map((q, idx) => {
                        // Optionally re-generate random options or reuse old ones
                        const options = getRandomOptions(q.target, myVerses || []);
                        return {
                            ...q,
                            id: prev.length + idx,
                            outputsOptions: options,
                            userAnswer: null,
                            isCorrect: false,
                        };
                    });

                    return [...prev, ...extraQuestions];
                });
                // Clear the `wrongAnswers` now that they've been re-injected
                setWrongAnswers([]);
                // Move to the next question (the first re-queued one)
                setCurrentIndex((i) => i + 1);
            } else {
                setCompleted(true);
            }
        }
    }, [currentIndex, quizData, wrongAnswers, myVerses]);

    /**
     * Reset the quiz if needed.
     * You can also rely on the initial useEffect logic if `myVerses` changes.
     */
    const resetQuiz = useCallback(() => {
        setCurrentIndex(0);
        setCompleted(false);
        setWrongAnswers([]);
        // The existing useEffect logic will re-run if you want to rebuild quizData from scratch.
        // Otherwise, you can forcibly re-generate quizData here if you want a fresh shuffle.
    }, []);

    // The current question object
    const currentQuestion = quizData[currentIndex];

    return {
        quizData,
        currentIndex,
        currentQuestion,
        completed,
        handleAnswer,
        nextQuestion,
        resetQuiz,
    };
}
