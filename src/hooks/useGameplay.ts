// useGameplayArea.ts
import React, {useCallback, useEffect, useState} from "react";
import {useVerses} from './useVerses';
import {Difficult, shuffleArray} from "@/lib/utils";
import type {Verset} from "@/lib/db";
import {useSearchParams} from "next/navigation";

export interface QuizItem {
    id: number;               // question index (0-based)
    target: Verset;           // la "bonne" réponse
    outputsOptions: Verset[]; // 4 choix possibles
    userAnswer: Verset | null;
    isCorrect: boolean;
    isOldError: boolean;
    missedCount: number;      // nombre de fois où cette question a déjà été ratée
}

/** Shuffle standard de Fisher–Yates */
function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/** Renvoie 4 options aléatoires (dont la bonne réponse) */
function getRandomOptions(correct: Verset, allVerses: Verset[]): Verset[] {
    const others = allVerses.filter((v) => v.id !== correct.id);
    const randomIncorrect = shuffle(others).slice(0, 3);
    return shuffle([correct, ...randomIncorrect]);
}

// interface GameplayReturn {
//     quizData: QuizItem[];
//     currentIndex: number;
//     currentQuestion: QuizItem | undefined;
//     completed: boolean;
//     score: number;
//     lives: number;
//     maxLives: number;
//     handleAnswer: (selectedOption: Verset) => void;
//     nextQuestion: () => void;
//     resetQuiz: () => void;
//     replayMistakes: () => void;
// }

export function useGameplayArea() {
    // Utilisation de React Query pour récupérer les versets
    const $q = useSearchParams()
    const training_id = $q.get("training_id");
    const {verses: myVerses, loading} = useVerses(training_id ?? undefined);
    const [quizData, setQuizData] = useState<QuizItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [completed, setCompleted] = useState<boolean>(false);
    const [difficult, setDifficult] = React.useState<Difficult>()

    // Ajout de mécaniques supplémentaires
    const [score, setScore] = useState<number>(0);
    const [lives, setLives] = useState<number>(3);
    const maxLives = 3;

    /**
     * State facultatif pour conserver les questions ratées
     * (On pourrait s'en passer si on injecte directement dans quizData,
     *  mais c'est parfois plus clair de le gérer à part).
     */
    const [wrongAnswers, setWrongAnswers] = useState<QuizItem[]>([]);

    /**
     * (Re)construction du quiz de base
     */
    useEffect(() => {
        if (!myVerses || myVerses.length === 0) return;

        const shuffledVerses = shuffleArray(myVerses);
        const selected = shuffledVerses.slice(0, 10);

        const newQuiz = selected.map((verse, index) => {
            const options = getRandomOptions(verse, selected);
            return {
                id: index,
                target: verse,
                outputsOptions: options,
                userAnswer: null,
                isCorrect: false,
                isOldError: false,
                missedCount: 0,
            };
        });

        setQuizData(newQuiz);
        setCurrentIndex(0);
        setCompleted(false);
        setWrongAnswers([]);
        setScore(0);
        setLives(maxLives);
    }, [myVerses]);

    /**
     * Gère la sélection d'une réponse par l'utilisateur
     */
    const handleAnswer = useCallback(
        (selectedOption: Verset, mode?: Difficult) => {
            setQuizData((prev) => {
                const updated = [...prev];
                const current = updated[currentIndex];

                const isHard = mode === Difficult.HARD;

                if (current) {
                    current.userAnswer = selectedOption;

                    console.log(`Difficul: ${mode} => ${isHard}`)

                    if (isHard) {
                        const target = current.target

                        const isSameBook = target.book_num === selectedOption.book_num;
                        const isSameChapter = target.chapter_num === selectedOption.chapter_num;
                        const isSameVerses =
                            target.verses_num.length === selectedOption.verses_num.length &&
                            target.verses_num.every((val, index) => val === selectedOption.verses_num[index]);

                        const selectedResult = (isSameBook && isSameChapter && isSameVerses)

                        current.isCorrect = selectedResult;
                        current.isOldError = !selectedResult;
                    } else {
                        current.isCorrect = (selectedOption.id === current.target.id);
                        current.isOldError = !current.isCorrect;
                    }

                    if (current.isCorrect) {
                        // Incrémente le score
                        setScore((old) => old + 1);
                    } else {
                        // Retire une vie
                        //setLives((old) => Math.max(old - 1, 0));
                        // Incrémente le nombre d'erreurs sur cette question
                        current.missedCount += 1;
                    }
                }
                return updated;
            });
        },
        [currentIndex]
    );


    /**
     * Passe à la question suivante.
     * - Si on est à la fin et qu'il reste des questions ratées, on les ré-injecte.
     * - Sinon, on passe à la question suivante.
     * - Si plus de vies, on arrête la partie.
     */
    const nextQuestion = useCallback(() => {
        setQuizData((prev) => {
            const current = prev[currentIndex];

            // Si la question courante n'est pas correcte, on l'ajoute à wrongAnswers
            if (current && !current.isCorrect) {
                setWrongAnswers((old) => {
                    // on peut vérifier qu'elle n'est pas déjà dedans
                    if (!old.find((q) => q.id === current.id)) {
                        return [...old, {...current}];
                    }
                    return old;
                });
            }

            return prev;
        });

        // Si plus de vies, fin immédiate
        if (lives <= 0) {
            setCompleted(true);
            return;
        }

        // Cas normal: il reste des questions
        if (currentIndex < quizData.length - 1) {
            setCurrentIndex((i) => i + 1);
        } else {
            // Fin du premier passage : on regarde s'il y a des erreurs à repasser
            if (wrongAnswers.length > 0) {
                setQuizData((prev) => {
                    const extraQuestions = wrongAnswers.map((q, idx) => {
                        // On peut recréer de nouvelles options si on veut
                        const options = getRandomOptions(q.target, myVerses || []);
                        return {
                            ...q,
                            id: prev.length + idx,
                            outputsOptions: options,
                            userAnswer: null,
                            isCorrect: false,
                            isOldError: false,
                        };
                    });

                    return [...prev, ...extraQuestions];
                });

                // On passe à la première question nouvellement ajoutée
                setCurrentIndex(quizData.length);
                // On vide le tableau des erreurs car elles sont réinjectées
                setWrongAnswers([]);
            } else {
                // Plus de questions et plus d'erreurs
                setCompleted(true);
            }
        }
    }, [currentIndex, quizData, wrongAnswers, lives, myVerses]);

    /**
     * Permet de relancer UNIQUEMENT les questions ratées, par exemple via un bouton
     * « Revoir mes erreurs ». On peut choisir d'autres stratégies (tout relancer, etc.).
     */
    const replayMistakes = useCallback(() => {
        if (wrongAnswers.length === 0) return;

        const mistakesQuiz = wrongAnswers.map((q, idx) => {
            const options = getRandomOptions(q.target, myVerses || []);
            return {
                ...q,
                id: idx, // reset d'index
                outputsOptions: options,
                userAnswer: null,
                isCorrect: false,
                isOldError: false,
            };
        });

        setQuizData(mistakesQuiz);
        setCurrentIndex(0);
        setCompleted(false);
        setWrongAnswers([]);
        // Optionnel : on peut remettre les vies à max, ou en conserver l'état
        // setLives(maxLives);
    }, [wrongAnswers, myVerses]);

    /**
     * Réinitialise complètement la session
     */
    const resetQuiz = useCallback(() => {
        setCurrentIndex(0);
        setCompleted(false);
        setWrongAnswers([]);
        setScore(0);
        setLives(maxLives);

        // On relance l'effet useEffect qui va recréer le quiz
        // Une astuce consiste à faire varier artificiellement un « key »
        // ou un state dépendant, ou simplement recharger myVerses si besoin.
    }, []);

    // Question courante
    const currentQuestion = quizData[currentIndex];

    return {
        difficult,
        setDifficult,
        quizData,
        currentIndex,
        currentQuestion,
        completed,
        score,
        lives,
        setLives,
        maxLives,
        handleAnswer,
        nextQuestion,
        resetQuiz,
        replayMistakes,
        wrongAnswers,
        setWrongAnswers,
        loading
    };
}
