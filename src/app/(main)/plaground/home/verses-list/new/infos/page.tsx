"use client"

import {BackButton} from "@/components/customize/utils";
import {AnimatePresence, motion} from "framer-motion"
import {cn} from "@/lib/utils";
import React, {useMemo} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export default function VersetInfos() {
    const [curStep, setCurStep] = React.useState<number>(1)
    const [chapter, setChapter] = React.useState<number | undefined>()
    const [versets, setVersets] = React.useState<number[] | undefined>()
    const [description, setDescription] = React.useState<string | undefined>()

    React.useEffect(() => {
        if (chapter) {
            const timer = setTimeout(() => {
                setCurStep(2)
                clearTimeout(timer)
            }, 200)
        }
    }, [chapter])

    const versetTitle = useMemo(() => {
        return `Proverbe ${chapter ? chapter + "" : ""} ${
            versets ? ":" + versets[0] + (versets.length > 1 ? "-" + versets[versets.length - 1] : "") : ""
        } `
    }, [chapter, versets])

    const fadeInUp = {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -20},
        transition: {duration: 0.3},
    }

    return (
        <div className="px-[20px] flex flex-col gap-[28px]">
            <BackButton isClose={true} link="/plaground/home/verses-list" mainTitle={versetTitle}/>
            <AnimatePresence mode="wait">
                {curStep === 1 && (
                    <motion.div key="step1" {...fadeInUp}>
                        <ListGrid
                            onSelect={(ns) => (ns.length ? setChapter(ns[0]) : setChapter(undefined))}
                            listTitle="Chapitre"
                            listCount={31}
                            selectType="unique"
                        />
                    </motion.div>
                )}
                {curStep === 2 && (
                    <motion.div key="step2" {...fadeInUp}>
                        <ListGrid
                            onSelect={(ns) => (ns.length ? setVersets(ns) : setVersets(undefined))}
                            listTitle="Versets"
                            listCount={20}
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
                                cols={10}
                                value={description}
                                onChange={e => setDescription(e.currentTarget.value)}
                                autoFocus={true}
                            />
                            <div className="text-[#4e5b64] text-sm font-normal leading-snug">
                                Vous n&apos;etes pas oubligé de mettre le contenu du verset dans son entiereté, juste un
                                aperçu pour
                                vous rappeler rapidment
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
                {<Button
                    variant={!description ? "disabled" : "default"}
                    className="w-full"
                    disabled={!description}
                    onClick={() => console.log("Ajouter le verset")}
                >
                    Ajouter le verset
                </Button>}
            </motion.div>}
        </div>
    )
}

interface ListGridProps {
    listTitle: string
    listCount: number
    max?: number
    onSelect: (v: number[]) => void
    selectType: "unique" | "range"
}

const ListGrid: React.FC<ListGridProps> = ({listTitle, listCount, max = 1, onSelect, selectType = "unique"}) => {
    const [actives, setActives] = React.useState<number[]>([])
    const [rangeStart, setRangeStart] = React.useState<number | null>(null)

    React.useEffect(() => {
        onSelect(actives)
    }, [actives, onSelect])

    const handleSelection = (number: number) => {
        if (selectType === "unique") {
            if (actives.includes(number)) {
                setActives(actives.filter((n) => n !== number))
            } else {
                setActives(actives.length < max ? [...actives, number] : [number])
            }
        } else if (selectType === "range") {
            if (rangeStart === null) {
                setRangeStart(number)
                setActives([number])
            } else {
                const start = Math.min(rangeStart, number)
                const end = Math.max(rangeStart, number)
                setActives(Array.from({length: end - start + 1}, (_, i) => start + i))
                setRangeStart(null)
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold font-['Feather']">{listTitle}</h2>
            <div className="grid grid-cols-5 gap-[10px]">
                {[...Array(listCount)].map((_, i) => {
                    const number = i + 1
                    const isActive = actives.includes(number)

                    return (
                        <button
                            onClick={() => handleSelection(number)}
                            key={number}
                            className={cn(
                                "aspect-square rounded-lg text-xl font-semibold flex items-center justify-center transition font-['Feather']",
                                isActive
                                    ? "bg-gradient-to-r from-[#2dabbc] to-[#42e1b1] border-b-4 border-[#1a143a]/20 text-gray-900"
                                    : "bg-bgPrimarySecondary hover:bg-bgPrimarySecondary/85",
                            )}
                        >
                            {number}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
