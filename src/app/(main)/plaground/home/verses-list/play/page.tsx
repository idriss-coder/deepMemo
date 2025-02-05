"use client"

import {Button} from "@/components/ui/button";
import {
    DBook,
    DCloseIcon,
    DFlagIcon,
    DFlatHeart,
    DHeartGray,
    DHeartRedIcon,
    DMisteryBoxIcon,
    DXPIcon
} from "@/components/customize/icons";
import {AnimatePresence, motion} from "framer-motion";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";

export default function PlayPage() {

    const [selectedVertset, setSelectedVertset] = React.useState<number | undefined>()
    const [requestClose, setRequestClose] = React.useState<boolean>(false);
    const [endStateOpen, setEndStateOpen] = React.useState<boolean>(false);
    const [progress, setProgress] = useState(0)
    const [isEnded, setIsEnded] = React.useState(false);

    return (
        <div className={"px-[20px] py-[20px] flex flex-col gap-[40px] relative"}>
            <PlayProgress
                progress={progress}
                onCloseClick={() => setRequestClose(true)}
            />
            <PlayInfo/>
            <PlayPlayground
                onSelectVerset={setSelectedVertset}
            />
            <PlayConfirm
                selectedVerset={selectedVertset}
                onConfirm={() => {
                    setProgress(progress < 100 ? progress + 20 : 100)
                    setEndStateOpen(true)
                }}
            />
            <EndStateScreen
                variant={"success"}
                state={endStateOpen ? "opened" : "closed"}
                onConfirm={() => {
                    if (progress >= 100) setIsEnded(true)
                    setEndStateOpen(false)
                }}
            />
            <ClosePartyScreen
                state={requestClose ? "opened" : "closed"}
                onCloseCancel={() => setRequestClose(false)}
            />

            {isEnded && <EndPartyScreen/>}
        </div>
    )
}

const PlayProgress: React.FC<{ onCloseClick: () => void, progress: number }> = ({onCloseClick, progress}) => {

    return (
        <div className={"flex items-center gap-[15px]"}>
            <button onClick={() => {
                onCloseClick()
            }}>
                <DCloseIcon/>
            </button>
            <ProgressBar progress={progress}/>
            <HeartCount/>
        </div>
    )
}

const HeartCount = () => {

    return (
        <div className={"flex items-center gap-[6px]"}>
            <DFlatHeart/>
            <div className="text-[#ef5658] text-xl font-bold font-['Feather']">4</div>
        </div>
    )
}

const ProgressBar: React.FC<{ progress: number }> = ({progress}) => {

    return (
        <div className={"flex-1"}>
            <div className={cn(
                "relative h-[18px] overflow-hidden  rounded-full  bg-[#38444d]",
            )}>
                <motion.div
                    className={cn(
                        "absolute top-0 left-0 h-full bg-gradient-to-r ",
                        progress > 50 ? "from-[#ffd900] to-[#ffd900]/85" : "from-lime-400 to-lime-500"
                    )}
                    initial={{width: 0}}
                    animate={{width: `${progress}%`}}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                    style={{
                        borderRadius: "inherit",
                    }}
                >
                    {progress > 20 &&
                        (<div className="w-[85%] h-[5px] opacity-25 bg-white rounded-[30px] ml-1 mt-1"/>)
                    }
                </motion.div>
            </div>
        </div>
    )
}

const PlayInfo = () => {

    return (
        <div className={"flex flex-col gap-[10px]"}>
            <div className="text-white text-xl font-bold font-['Feather']">Séléctionne le bon verset</div>
            <div
                className="text-white/80 text-base font-normal leading-[30px]"
            >
                Celui qui marche avec les sages deviendra sage, mais celui qui fréquente les stupides aura des problème
            </div>
        </div>
    )
}

const PlayConfirm: React.FC<{ selectedVerset: number | undefined, onConfirm: () => void }> = ({
                                                                                                  selectedVerset,
                                                                                                  onConfirm
                                                                                              }) => {


    return (
        <motion.div
            className="px-[20px] py-8 flex flex-col gap-2 items-center justify-center bg-gradient-to-b from-[#141f25]/0 via-[#141f25] to-[#141f25] fixed bottom-0 right-0 w-full"
            initial={{opacity: 0, y: 0}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2, duration: 0.3}}
        >
            <Button
                variant={selectedVerset ? "green" : "disabled"}
                className="w-full"
                disabled={!selectedVerset}
                onClick={onConfirm}
            >
                Valider
            </Button>
        </motion.div>
    )
}

const verses = [
    {id: 1, reference: "Mat. 24:14"},
    {id: 2, reference: "John 3:16"},
    {id: 3, reference: "Rom. 8:28"},
    {id: 4, reference: "Phil. 4:13"},
]

const PlayPlayground: React.FC<{ onSelectVerset: (v: number) => void }> = ({onSelectVerset}) => {
    const [selectedVerse, setSelectedVerse] = useState<number | null>(null)

    const handleClick = (id: number) => {
        setSelectedVerse(id === selectedVerse ? null : id)
        onSelectVerset(id)
    }

    return (
        <div className="flex flex-col gap-4">
            <AnimatePresence>
                {verses.map((verse) => (
                    <motion.div
                        key={verse.id}
                        initial={{opacity: 1}}
                        exit={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.3}}
                    >
                        <Button
                            size="default"
                            variant={selectedVerse === verse.id ? "selected" : "neutral"}
                            className={cn(
                                "w-full flex justify-between items-center",
                                selectedVerse !== verse.id ? "border-[#38454e]" : ""
                            )}
                            onClick={() => handleClick(verse.id)}
                        >
                            <span>{verse.reference}</span>
                            <motion.div
                                className="text-5xl"
                                initial={{scale: 2}}
                                animate={{scale: selectedVerse === verse.id ? [2, 2.2, 2] : 2}}
                                transition={{duration: 0.3}}
                            >
                                {selectedVerse === verse.id
                                    ? <DHeartRedIcon/>
                                    : <DHeartGray/>
                                }
                            </motion.div>
                        </Button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

const EndStateScreen: React.FC<{
    variant?: "success" | "error",
    state?: "opened" | "closed",
    onConfirm: () => void
}> = ({variant, state, onConfirm}) => {

    const isError = variant === "error"
    const isOpened = state === "opened"

    return (
        <>
            {isOpened && <TransitionScreen>
                <div className={"w-full h-fit py-8 pt-6 px-5 gap-4 flex flex-col justify-between bg-[#213037]"}>
                    <div className={"flex items-center gap-[11px]"}>
                        <DFlagIcon className={cn(
                            isError ? "text-[#CE5D55]" : "text-[#92d233]"
                        )}/>
                        <div className={cn(
                            "text-[#92d233] text-xl font-bold font-['Feather']",
                            isError && "text-[#CE5D55]"
                        )}
                        >
                            {isError ? "Mauvais choix" : "Bonne reponse"}
                        </div>
                    </div>
                    <Button
                        variant={isError ? "red" : "green"}
                        className="w-full"
                        onClick={onConfirm}
                    >
                        Continuer
                    </Button>
                </div>
            </TransitionScreen>}
        </>
    )
}


const ClosePartyScreen: React.FC<{ state?: "closed" | "opened", onCloseCancel: () => void }> = ({
                                                                                                    state,
                                                                                                    onCloseCancel
                                                                                                }) => {

    const isOpened = state === "opened"
    const $router = useRouter()

    return (
        <TransitionScreen className={cn(
            "bg-black/80",
            isOpened ? "h-screen" : "h-0 overflow-hidden"
        )}>
            <div className={cn(
                "w-full h-fit p-5 pb-10 py-[30px] flex flex-col justify-between bg-[#141f25] rounded-t-lg overflow-hidden",
                isOpened ? "h-fit" : "h-[0%]"
            )}>

                <div className={"flex flex-col items-center gap-[20px]"}>
                    <DXPIcon/>
                    <div className={"flex flex-col gap-[29px]"}>
                        <div className={"flex flex-col gap-[17px]"}>
                            <div className="text-white text-xl font-bold font-['Feather'] text-center">
                                Tu veux vraiment arrêter ?
                            </div>
                            <div className="text-center text-[#4e5b64] text-sm font-normal leading-snug">
                                Si tu arrete maintenant, tu perdras toutes ta progression et lors de ton prochain
                                entrainement
                                tu
                                devras recommencer to progrssion à zéro.
                            </div>
                        </div>

                        <div className={"flex flex-col gap-[20px]"}>
                            <Button
                                variant={"green"}
                                className="w-full"
                                onClick={onCloseCancel}
                            >
                                Continuer
                            </Button>
                            <Button
                                variant={"textRed"}
                                className="w-full"
                                onClick={() => {
                                    $router.push("/plaground/home/verses-list")
                                }}
                            >
                                Terminer la session
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </TransitionScreen>
    )
}

const EndPartyScreen: React.FC = () => {

    const $router = useRouter()

    return (
        <div
            className={"h-screen flex flex-col justify-between w-full px-[20px] bg-[#141f25] absolute top-0 left-0 overflow-hidden"}>
            <div>
            </div>
            <div className={"flex flex-col gap-[30px] items-center"}>
                <DMisteryBoxIcon/>
                <div className="text-[#ffd900] text-[22px] font-bold font-['Feather']">Entraînement terminé !</div>
                <div className={"flex gap-3 w-full"}>

                    <div className={"flex-1"}>
                        <StatItem
                            icon={
                                <DBook width={25} height={25}/>
                            }
                            title={"29895"}
                            desc={"XP gagnés"}
                        />
                    </div>

                    <div className={"flex-1"}>
                        <StatItem
                            icon={
                                <DXPIcon width={25} height={25}/>
                            }
                            title={"0.7"}
                            desc={"Taux de réussite"}
                        />
                    </div>

                </div>
            </div>
            <div className={"mb-8"}>
                <Button
                    variant={"default"}
                    className="w-full"
                    onClick={() => {
                        $router.push("/plaground/home/verses-list")
                    }}
                >
                    Continuer
                </Button>
            </div>
        </div>
    )
}

const StatItem: React.FC<{ icon: React.ReactNode, title: React.ReactNode, desc: React.ReactNode }> = ({
                                                                                                          icon,
                                                                                                          title,
                                                                                                          desc
                                                                                                      }) => {

    return (
        <div
            className={"h-[73px] w-full px-3.5 py-2.5 bg-transparent rounded-[10px] border-2 border-[#38454e] flex gap-2 items-start"}>
            <div>
                {icon}
            </div>
            <div>
                <div className="text-white/90 text-base font-bold font-['Feather']">{title}</div>
                <div className="text-[#4e5b64] text-sm font-normal">{desc}</div>
            </div>
        </div>
    )
}

const TransitionScreen: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className}) => {
    return (
        <div
            className={cn("h-screen w-full absolute top-0 left-0 flex justify-between items-end", className)}>
            {children}
        </div>
    )
}