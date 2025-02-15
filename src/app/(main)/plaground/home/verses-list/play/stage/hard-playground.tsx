import React, {useMemo, useState} from "react";
import {Verset} from "@/lib/db";
import {AnimatePresence} from "framer-motion";
import {BookSelectSection} from "@/app/(main)/plaground/home/verses-list/new/_sections/book-select-section";
import {ScrollArea} from "@/components/ui/scroll-area";
import {BibleBook, SimpleBook} from "@/backend/mock/bible-book";
import {ListGrid} from "@/app/(main)/plaground/home/verses-list/new/infos/_components/list-grid-component";
import {normalizeVersetTitle} from "@/lib/utils";
import {DChevronLeft} from "@/components/customize/icons";

export const HardPlayground: React.FC<{
    onSelect: (v: SimpleBook) => void,
    selected?: SimpleBook
}> = ({
          onSelect,
          selected
      }) => {

    const [bookID, setBookID] = useState<number>()
    const [chapter, setChapter] = useState<number>()
    const [versets, setVersets] = React.useState<number[] | undefined>()


    const [step, setStep] = useState(1);

    const book = useMemo(() => {
        if (!bookID) return
        const foundBook = BibleBook.find(b => b.id === +bookID)
        if (!foundBook) setStep(1)
        return foundBook
    }, [bookID])

    const bookTitle = useMemo(() => {
        const decimal = normalizeVersetTitle({verses_num: versets, book_num: bookID, chapter_num: chapter} as Verset)

        if (!book) return ""

        return `${book.label} ${decimal}`
    }, [bookID, chapter, versets, book])


    const onSelectBook = (book_id: number) => {
        setBookID(book_id)
        onSelect({bookId: book_id})
        setStep(2)
    }

    const onSelectChapter = (ns: number[]) => {
        if (!ns.length) {
            setChapter(undefined)
            return
        }
        const curChapter = ns[0]

        setChapter(curChapter)

        onSelect({...selected, chapter: curChapter})

        setStep(3)
    }

    const _onSelectVerset = (ns: number[]) => {
        if (!ns.length) {
            setVersets(undefined)
            return
        }
        setVersets(ns)
        onSelect({...selected, verses: ns})
    }

    const onBack = () => {
        if (step <= 1) return
        const curStep = step - 1
        setStep(curStep)

        if (curStep == 2) {
            setVersets(undefined)
        }

        if (curStep == 1) {
            setChapter(undefined)
            setBookID(undefined)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {book && (
                <div
                    className="text-[#4abef7] text-lg font-bold font-['Feather'] mb-3 flex items-center justify-start gap-2"
                >
                    {(step > 1) && (
                        <button
                            onClick={onBack}
                            className={"text-gray-200 opacity-5 size-8 w-5 flex items-center justify-start pt-1"}
                        >
                            <DChevronLeft/>
                        </button>
                    )}
                    <div>{bookTitle}</div>
                </div>
            )}
            <AnimatePresence>
                <ScrollArea
                    className={"h-[600px] sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] screen-h-adjust"}
                >

                    {step == 1 && (
                        <BookSelectSection
                            cb={onSelectBook}
                        />
                    )}
                    {step == 2 && book && (
                        <ListGrid
                            onSelect={onSelectChapter}
                            listCount={book.chapters}
                            selectType="unique"
                        />
                    )}
                    {step == 3 && book && (
                        <ListGrid
                            onSelect={_onSelectVerset}
                            listCount={book.chaptersVerses.find(cv => cv.chapter == chapter)?.verses || 0}
                            selectType="range"
                        />
                    )}
                </ScrollArea>
            </AnimatePresence>
        </div>
    )
}