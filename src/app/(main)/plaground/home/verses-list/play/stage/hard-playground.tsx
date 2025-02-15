import React, {useEffect, useMemo, useState} from "react";
import {Verset} from "@/lib/db";
import {AnimatePresence, motion} from "framer-motion";
import {BookSelectSection} from "@/app/(main)/plaground/home/verses-list/new/_sections/book-select-section";
import {ScrollArea} from "@/components/ui/scroll-area";
import {BibleBook, SimpleBook} from "@/backend/mock/bible-book";
import {ListGrid} from "@/app/(main)/plaground/home/verses-list/new/infos/_components/list-grid-component";
import {normalizeVersetTitle} from "@/lib/utils";
import {DChevronLeft} from "@/components/customize/icons";

export const HardPlayground: React.FC<{
    onSelect: (v: SimpleBook) => void;
    selected?: SimpleBook;
    verses: Verset[];
}> = ({onSelect, selected, verses: propositions}) => {
    const [bookID, setBookID] = useState<number>();
    const [chapter, setChapter] = useState<number>();
    const [versets, setVersets] = useState<number[] | undefined>();
    const [step, setStep] = useState(1);

    // Quand 'propositions' change, on réinitialise tout
    useEffect(() => {
        if (propositions) {
            setBookID(undefined);
            setChapter(undefined);
            setVersets(undefined);
            setStep(1);
        }
    }, [propositions]);

    // On récupère le livre sélectionné
    const book = useMemo(() => {
        if (!bookID) return undefined;
        const foundBook = BibleBook.find((b) => b.id === +bookID);
        if (!foundBook) setStep(1);
        return foundBook;
    }, [bookID]);

    // Petit label d'affichage
    const bookTitle = useMemo(() => {
        const decimal = normalizeVersetTitle({
            verses_num: versets,
            book_num: bookID,
            chapter_num: chapter,
        } as Verset);

        if (!book) return "";
        return `${book.label} ${decimal}`;
    }, [bookID, chapter, versets, book]);

    // Sélection d'un livre → step 2
    const onSelectBook = (book_id: number) => {
        setBookID(book_id);
        onSelect({bookId: book_id});
        setStep(2);
    };

    // Sélection d'un chapitre → step 3
    const onSelectChapter = (ns: number[]) => {
        if (!ns.length) {
            setChapter(undefined);
            return;
        }
        const curChapter = ns[0];
        setChapter(curChapter);
        onSelect({...selected, chapter: curChapter});
        setStep(3);
    };

    // Sélection de versets (reste en step 3, pas de step 4, sauf si tu veux)
    const _onSelectVerset = (ns: number[]) => {
        if (!ns.length) {
            setVersets(undefined);
            return;
        }
        setVersets(ns);
        onSelect({...selected, verses: ns});
    };

    // Bouton de retour
    const onBack = () => {
        if (step <= 1) return;
        const curStep = step - 1;
        setStep(curStep);

        if (curStep == 2) {
            setVersets(undefined);
        }
        if (curStep == 1) {
            setChapter(undefined);
            setBookID(undefined);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {book && (
                <div
                    className="text-[#4abef7] text-lg font-bold font-['Feather'] mb-3 flex items-center justify-start gap-2">
                    {step > 1 && (
                        <button
                            onClick={onBack}
                            className="text-gray-200 opacity-5 size-8 w-5 flex items-center justify-start pt-1"
                        >
                            <DChevronLeft/>
                        </button>
                    )}
                    <div>{bookTitle}</div>
                </div>
            )}

            <ScrollArea
                className={
                    "h-[460px] sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] screen-h-adjust"
                }
            >
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{opacity: 0, x: -40}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 40}}
                            transition={{duration: 0.3}}
                        >
                            <BookSelectSection cb={onSelectBook}/>
                        </motion.div>
                    )}

                    {step === 2 && book && (
                        <motion.div
                            key="step2"
                            initial={{opacity: 0, x: 40}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -40}}
                            transition={{duration: 0.3}}
                        >
                            <ListGrid
                                isGame={true}
                                onSelect={onSelectChapter}
                                listCount={book.chapters}
                                selectType="unique"
                            />
                        </motion.div>
                    )}

                    {step === 3 && book && (
                        <motion.div
                            key="step3"
                            initial={{opacity: 0, y: 40}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -40}}
                            transition={{duration: 0.3}}
                        >
                            <ListGrid
                                isGame={true}
                                onSelect={_onSelectVerset}
                                listCount={
                                    book.chaptersVerses.find((cv) => cv.chapter === chapter)
                                        ?.verses || 0
                                }
                                selectType="range"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </ScrollArea>
        </div>
    );
};
