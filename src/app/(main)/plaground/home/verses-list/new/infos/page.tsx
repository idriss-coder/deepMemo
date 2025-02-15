"use client"

import {BackButton} from "@/components/customize/utils";
import {AnimatePresence, motion} from "framer-motion"
import React, {Suspense, useEffect, useMemo} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";
import {BibleBook} from "@/backend/mock/bible-book";
import {db} from "@/lib/db";
import {
    DeleteVersetConfirmScreen,
    ListGrid
} from "@/app/(main)/plaground/home/verses-list/new/infos/_components/list-grid-component";

export default function VersetInfos() {
    const [curStep, setCurStep] = React.useState<number>(1)
    const [chapter, setChapter] = React.useState<number | undefined>()
    const [versets, setVersets] = React.useState<number[] | undefined>()
    const [mockedDescription, setMockedDescription] = React.useState<string>()
    const [description, setDescription] = React.useState<string | undefined>()
    const [requestDelete, setRequestDelete] = React.useState(false)

    const $q = useSearchParams()
    const $router = useRouter()
    const book_id = $q.get("book_id")
    const verset_id = $q.get("verset_id")

    const isUpdate = useMemo(() => {
        return !!verset_id
    }, [verset_id])

    const book = useMemo(() => {
        if (!book_id) return
        const foundBook = BibleBook.find(b => b.id === +book_id)
        if (!foundBook) $router.back()
        return foundBook
    }, [$router, book_id])

    useEffect(() => {
        const requestVerset = async () => {
            console.log(`requestVerset ${verset_id}`)
            if (!verset_id) return
            const versetData = await db.verses.get(+verset_id)
            if (versetData) {
                setChapter(versetData.chapter_num)
                setVersets(versetData.verses_num)
                setDescription(versetData.content)
                setMockedDescription(versetData.content)
                setCurStep(3)
            }
            console.log(versetData)
        }
        void requestVerset()

    }, [verset_id])


    React.useEffect(() => {
        if (chapter && !isUpdate) {
            const timer = setTimeout(() => {
                setCurStep(2)
                clearTimeout(timer)
            }, 200)
        }
    }, [chapter])


    const versetTitle = useMemo(() => {
        return `${book?.label} ${chapter ? chapter + "" : ""} ${
            versets ? ":" + versets[0] + (versets.length > 1 ? "-" + versets[versets.length - 1] : "") : ""
        } `
    }, [chapter, versets, book])

    const handleDeleteVerset = async () => {
        if (!verset_id) return
        await db.verses.delete(+verset_id)
        $router.push("/plaground/home/verses-list")
    }

    const handleUpdateVerset = async () => {
        if (!verset_id) return
        await db.verses.update(+verset_id, {content: description})
        $router.push("/plaground/home/verses-list")
    }

    async function handleAddVerset() {

        if (!book_id) return
        if (!chapter) return
        if (!versets) return
        if (!description) return

        await db.verses.add({
            book_num: +book_id,
            chapter_num: chapter,
            verses_num: versets,
            content: description,
            createdAt: new Date(),
        });

        setChapter(undefined)
        setVersets(undefined)
        setDescription(undefined)

        $router.push("/plaground/home/verses-list")
    }


    const fadeInUp = {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -20},
        transition: {duration: 0.3},
    }

    if (!book) {

        return (
            <div className={"p-[20px]"}>
                <div className={"w-full h-[300px] bg-slate-500 animate-pulse"}>
                </div>
            </div>
        )
    }

    return (
        <Suspense>
            <div className="px-[20px] flex flex-col gap-[28px]">
                <BackButton isClose={true} link="/plaground/home/verses-list" mainTitle={versetTitle}/>
                <AnimatePresence mode="wait">
                    {curStep === 1 && (
                        <motion.div key="step1" {...fadeInUp}>
                            <ListGrid
                                onSelect={(ns) => (ns.length ? setChapter(ns[0]) : setChapter(undefined))}
                                listTitle="Chapitre"
                                listCount={book.chapters}
                                selectType="unique"
                            />
                        </motion.div>
                    )}
                    {curStep === 2 && (
                        <motion.div key="step2" {...fadeInUp}>
                            <ListGrid
                                onSelect={(ns) => (ns.length ? setVersets(ns) : setVersets(undefined))}
                                listTitle="Versets"
                                listCount={book.chaptersVerses.find(cv => cv.chapter == chapter)?.verses || 0}
                                selectType="range"
                            />
                            <motion.div
                                className="h-[140px] p-[20px] flex flex-col gap-2 items-center justify-center bg-gradient-to-b from-[#141f25]/0 via-[#141f25] to-[#141f25] fixed bottom-0 right-0 w-full"
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.2, duration: 0.3}}
                            >
                                {curStep == 2 && <Button
                                    variant={versets?.length ? "default" : "disabled"}
                                    disabled={!versets?.length}
                                    className="w-full"
                                    onClick={() => setCurStep(3)}
                                >
                                    Continuer
                                </Button>}
                            </motion.div>
                        </motion.div>
                    )}
                    {curStep === 3 && (
                        <motion.div key="step3" {...fadeInUp} className="flex flex-col gap-6">
                            <h2 className="text-2xl font-bold font-['Feather']">De quoi parle {versetTitle} ?</h2>
                            <div className="flex flex-col gap-4">
                                <Textarea
                                    rows={6}
                                    value={description}
                                    onChange={e => setDescription(e.currentTarget.value)}
                                    autoFocus={true}
                                />
                                <div className="text-[#4e5b64] text-sm font-normal leading-snug">
                                    Vous n’êtes pas obligé d’inclure tout le verset : un simple aperçu suffit pour vous
                                    en rappeler rapidement.
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {curStep === 3 && <motion.div
                    className="h-[140px] p-[20px] flex flex-col gap-2 items-center justify-center bg-gradient-to-b from-[#141f25]/0 via-[#141f25] to-[#141f25] fixed bottom-0 right-0 w-full"
                    initial={{opacity: 0, y: 0}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2, duration: 0.3}}
                >
                    <div className={"w-full flex flex-col gap-2"}>
                        <Button
                            variant={(isUpdate ? (description == mockedDescription) || !description : (!description)) ? "disabled" : "default"}
                            className="w-full"
                            disabled={isUpdate ? (description == mockedDescription) || !description : (!description)}
                            onClick={isUpdate ? handleUpdateVerset : handleAddVerset}
                        >
                            {isUpdate ? "Mettre à jour le verset" : "Ajouter le verset"}
                        </Button>
                        {isUpdate && <Button
                            variant={"textRed"}
                            onClick={() => setRequestDelete(true)}
                        >
                            Supprimer le verset
                        </Button>}
                    </div>
                </motion.div>}

                <DeleteVersetConfirmScreen
                    state={requestDelete ? "opened" : "closed"}
                    onCloseCancel={() => setRequestDelete(false)}
                    onDeleteConfirm={handleDeleteVerset}
                />
            </div>
        </Suspense>
    )
}

