"use client"

import {BackButton} from "@/components/customize/utils";
import {AnimatePresence, motion} from "framer-motion"
import React, {Suspense, useEffect, useMemo, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";
import {BibleBook} from "@/backend/mock/bible-book";
import {
    DeleteVersetConfirmScreen,
    ListGrid
} from "@/app/plaground/home/verses-list/new/infos/_components/list-grid-component";
import {toast} from "sonner";
import {cn, removeNumberAtStart, startsWithNumber} from "@/lib/utils";
import Image from "next/image";
import {DArrowGoIcon} from "@/components/customize/icons";
import {useVerses, useVersetMutations} from "@/hooks/useVerses";
import {useProfile} from "@/hooks/_screens/useAuth";

export default function VersetInfos() {
    const [curStep, setCurStep] = React.useState<number>(1)
    const [localId, setLocalId] = React.useState<number>()
    const [chapter, setChapter] = React.useState<number | undefined>()
    const [versets, setVersets] = React.useState<number[] | undefined>()
    const [mockedDescription, setMockedDescription] = React.useState<string>()
    const [description, setDescription] = React.useState<string | undefined>()
    const [requestDelete, setRequestDelete] = React.useState(false)
    const [clipboardContent, setClipboardContent] = useState<string>('');
    const {profile: user} = useProfile()
    const {verses: myVerses} = useVerses()
    const {createVerset, updateVerset, deleteVerset, isCreating, isUpdating, isDeleting} = useVersetMutations()

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
            const versetData = myVerses.find(v => String(v._id) === verset_id)
            if (versetData) {
                setChapter(versetData.chapter_num)
                setLocalId(versetData.local_id)
                setDescription(versetData.content)
                setMockedDescription(versetData.content)
                setCurStep(3)
                setLocalId(versetData.local_id)
            }
            console.log(versetData)
        }
        void requestVerset()

    }, [myVerses, verset_id])


    React.useEffect(() => {
        if (chapter && !isUpdate) {
            const timer = setTimeout(() => {
                setCurStep(2)
                clearTimeout(timer)
            }, 200)
        }
    }, [chapter, isUpdate])

    const readClipboard = async () => {
        try {
            if (!document.hasFocus()) {
                return;
            }
            const text = await navigator.clipboard.readText();

            const isBibleVerset = startsWithNumber(text)

            if (isBibleVerset) {
                setClipboardContent(removeNumberAtStart(text))
            }

        } catch (error) {
            console.error('Erreur lors de la lecture du presse-papier :', error);
        }
    };

    useEffect(() => {
        const handleFocus = () => {
            void readClipboard();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    const clipboardApplied = useMemo(() => {
        return clipboardContent == description
    }, [clipboardContent, description])

    const versetTitle = useMemo(() => {
        return `${book?.label} ${chapter ? chapter + "" : ""} ${
            versets ? ":" + versets[0] + (versets.length > 1 ? "-" + versets[versets.length - 1] : "") : ""
        } `
    }, [chapter, versets, book])

    const handleDeleteVerset = async () => {
        if (!verset_id || !localId) return
        const toastId = toast.loading("Suppression en cours...")
        try {
            await deleteVerset(localId)
            toast.dismiss(toastId)
            toast.success("Verset supprimé")
            $router.push("/plaground/home/verses-list")
        } catch (error) {
            toast.dismiss(toastId)
            toast.error("Erreur lors de la suppression")
        }
    }

    const handleUpdateVerset = async () => {
        if (!verset_id || !localId || !description) return
        const toastId = toast.loading("Mise à jour en cours...");
        try {
            await updateVerset({localId, content: description})
            toast.dismiss(toastId)
            toast.success("Verset mis à jour")
            $router.push("/plaground/home/verses-list")
        } catch (error) {
            toast.dismiss(toastId)
            toast.error("Erreur lors de la mise à jour")
        }
    }

    async function handleAddVerset() {
        console.log("handleAddVerset")
        console.log("book_id", book_id)
        console.log("chapter", chapter)
        console.log("versets", versets)
        console.log("description", description)
        console.log("user?.user_id", user._id)
        if (!book_id || !chapter || !versets || !description || !user?._id) return

        const _verset = {
            user_id: user._id,
            book_num: +book_id,
            chapter_num: chapter,
            verses_num: versets,
            content: description,
        }

        const toastId = toast.loading("Ajout en cours...")
        try {
            await createVerset(_verset)
            toast.dismiss(toastId)
            toast.success("Verset ajouté")

            setChapter(undefined)
            setVersets(undefined)
            setDescription(undefined)

            $router.push("/plaground/home/verses-list")
        } catch (error) {
            toast.dismiss(toastId)
            toast.error("Erreur lors de l'ajout")
        }
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

    const onDescriptionChange = (description: string) => {
        const cleanedText = removeNumberAtStart(description)

        const descriptionStartsWithNumber = startsWithNumber(description)

        if (descriptionStartsWithNumber) {
            toast.info("Le numéro du verset a été automatiquement retiré ✂️");
        }

        setDescription(cleanedText);
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
                            {<div
                                className={cn(
                                    "h-[57px] relative gap-[14px] bg-[#38454e]/20 rounded-[5px] border-[#38454e] overflow-hidden transition items-center justify-between p-[14px]",
                                    !clipboardApplied && clipboardContent ? "flex" : "hidden"
                                )}>
                                <ClipboardStatus/>
                                <div
                                    className="text-[#808990] text-sm font-normal  leading-snug line-clamp-2">
                                    {clipboardContent}
                                </div>
                                <button
                                    className={"animate-pulse"}
                                    onClick={() => setDescription(clipboardContent)}
                                >
                                    <DArrowGoIcon color={"#4abef7"} className={"text-[#4abef7]"}/>
                                </button>
                            </div>}
                            <div className="flex flex-col gap-4">
                                <div className={"relative"}>
                                    <Textarea
                                        rows={6}
                                        value={description}
                                        onChange={e => onDescriptionChange(e.currentTarget.value)}
                                        autoFocus={true}
                                    />
                                    <div className={"absolute bottom-6 right-4"}>
                                        {clipboardApplied && <ClipboardStatus/>}
                                    </div>
                                </div>
                                <div className="text-[#4e5b64] text-sm font-normal leading-snug">
                                    Vous n'êtes pas obligé d'inclure tout le verset : un simple aperçu suffit pour vous
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
                            disabled={isUpdate ? (description == mockedDescription) || !description : (!description) || isUpdating || isCreating}
                            onClick={isUpdate ? handleUpdateVerset : handleAddVerset}
                        >
                            {isCreating || isUpdating ? (
                                    <span>{isUpdate ? "Mise à jour en cours..." : "Ajout en cours..."}</span>
                                ) :
                                (<>
                                    {isUpdate ? "Mettre à jour le verset" : "Ajouter le verset"}
                                </>)
                            }
                        </Button>
                        {isUpdate && <Button
                            variant={"textRed"}
                            disabled={isDeleting}
                            onClick={() => setRequestDelete(true)}
                        >
                            {isDeleting ? "Suppression..." : "Supprimer le verset"}
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

const ClipboardStatus = () => {
    return (
        <Image
            src={"/assets/uix/info.png"}
            alt={"info ico"}
            width={50}
            height={50}
            className={"size-[25px] animate-in"}
        />
    )
}