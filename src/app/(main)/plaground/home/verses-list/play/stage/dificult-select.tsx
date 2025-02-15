"use client"

import React, {useMemo} from "react";
import {TransitionScreen} from "@/app/(main)/plaground/home/verses-list/play/components/closeConfirm";
import {BackButton} from "@/components/customize/utils";
import {Button} from "@/components/ui/button";
import {DBookIcon, HardLevelIcon, LowLevelIcon} from "@/components/customize/icons";
import {cn, Difficult} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";
import hardMascot from "@/effect/hard-mascot.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(
    () => import('lottie-react'),
    {ssr: false}
)

export const DifficultSelectScreen: React.FC<{
    isOpen: boolean
    onDifficultChange: (e: Difficult) => void
    onClose: () => void
    selected?: Difficult
}> = ({isOpen, onDifficultChange, onClose, selected}) => {

    const levelBrief = useMemo(() => {
        const hardDescription =
            "Bienvenue en zone hardcore ! Ici, aucune proposition : tu tapes ta réponse. Chaque lettre compte, alors montre ce que tu vaux !"
        const classicDescription =
            "Fonce et clique ! Sélectionne la bonne réponse, enchaîne sans stress. Idéal pour passer du temps en mode détente !"
        return selected === Difficult.CLASSIC ? classicDescription : selected === Difficult.HARD ? hardDescription : ""
    }, [selected])

    if (!isOpen) return

    const isHard = selected == Difficult.HARD

    return (
        <TransitionScreen className="bg-bgPrimary z-40 flex items-start pt-6 px-4">
            <div className="flex flex-col items-center justify-center w-full">
                <BackButton
                    isClose={true}
                    link="/plaground/home/verses-list"
                    mainTitle="Quel niveau souhaite-tu jouer ?"
                />
                <motion.div
                    className="w-full mt-9"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <DifficultSelect
                        selected={selected}
                        onSelectChange={onDifficultChange}
                    />
                </motion.div>
            </div>
            <motion.div
                className="mb-8 py-8 pt-2 px-5 fixed bottom-0 right-0 w-full"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.2}}
            >
                <AnimatePresence mode="wait">
                    {selected && (
                        <motion.div
                            key={selected}
                            className="mb-8 flex flex-col gap-5 items-center"
                        >
                            {isHard ? <div className={""}>
                                <div className={"-mb-[70px] w-[300px] h-[300px]"}>
                                    <Lottie
                                        animationData={hardMascot}
                                        loop={false}
                                        autoplay={true}
                                        width={300}
                                        height={300}
                                    />
                                </div>
                            </div> : <DBookIcon/>}
                            <motion.p
                                className="text-center text-[#4e5b64] text-sm font-normal leading-snug"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.3, delay: 0.1}}
                            >
                                {levelBrief}
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.3}}
                >
                    <Button
                        variant={selected ? "default" : "disabled"}
                        disabled={!selected}
                        className="w-full"
                        onClick={() => {
                            if (selected) {
                                onClose()
                            }
                        }}
                    >
                        Continuer
                    </Button>
                </motion.div>
            </motion.div>
        </TransitionScreen>
    )
}


const DifficultSelect: React.FC<{
    onSelectChange: (e: Difficult) => void,
    selected?: Difficult
}> = ({
          onSelectChange,
          selected
      }) => {
    return (
        <div className={"w-full flex flex-col gap-3"}>
            <DifficultyItem
                uid={Difficult.CLASSIC}
                selected={selected}
                label={"Facile"}
                icon={<LowLevelIcon/>}
                onSelectChange={onSelectChange}
            />
            <DifficultyItem
                uid={Difficult.HARD}
                selected={selected}
                label={"Difficile"}
                icon={<HardLevelIcon/>}
                onSelectChange={onSelectChange}
            />
        </div>
    )
}

const DifficultyItem: React.FC<{
    label: string,
    icon: React.ReactNode,
    uid: Difficult,
    selected?: Difficult,
    onSelectChange: (e: Difficult) => void,
}> = ({
          label,
          icon,
          uid,
          selected, onSelectChange,
      }) => {

    const isSelected = uid === selected;

    return (
        <div className={"w-full"}>
            <Button
                variant={isSelected ? "selected" : "neutral"}
                size={"lg"}
                soundMode={2}
                withSound={true}
                className={cn(
                    "w-full flex justify-between",
                    isSelected ? "" : "border-[#38454e]"
                )}
                onClick={() => onSelectChange(uid)}
            >
                <div>{label}</div>
                <div className={"scale-[2.2] pr-2"}>{icon}</div>
            </Button>
        </div>
    )
}