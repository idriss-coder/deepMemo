'use client';

import {useEffect, useState} from 'react';
import {db, Quiz} from "@/lib/db";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function QuizPage() {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        // Exemple : charger depuis IndexedDB au montage du composant
        const loadQuizzes = async () => {
            const allQuizzes = await db.quizzes.toArray();
            setQuizzes(allQuizzes);
        };
        loadQuizzes();
    }, []);

    // Exemple : ajouter un quiz
    async function handleAddQuiz() {
        await db.quizzes.add({
            question: question,
            answer: answer,
            createdAt: new Date(),
        });
        // Recharger la liste
        const allQuizzes = await db.quizzes.toArray();
        setQuizzes(allQuizzes);

        setQuestion("")
        setAnswer("")
    }

    return (
        <main style={{padding: 20}} className={"text-slate-900"}>
            <h1>Mes Quizzes</h1>
            <div className={"py-4 w-full flex flex-col gap-2"}>
                <Input placeholder={"Question"}
                       type="text" value={question}
                       onChange={(e) => setQuestion(e.target.value)}
                />
                <Input
                    placeholder={"Reponse"}
                    type="text"
                    value={answer} onChange={(e) => setAnswer(e.target.value)}
                />
                <Button onClick={handleAddQuiz} variant="outline">Button</Button>
            </div>
            <ul>
                {quizzes.map((q) => (
                    <li key={q.id} className={"text-slate-900"}>
                        <strong>{q.question}</strong> : {q.answer}
                    </li>
                ))}
            </ul>
        </main>
    );
}
