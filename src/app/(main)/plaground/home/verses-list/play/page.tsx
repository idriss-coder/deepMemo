"use client"

import {Button} from "@/components/ui/button";
import {DCloseIcon, DFlagIcon, DHeartGray, DHeartRedIcon, DMisteryBoxIcon, DXPIcon} from "@/components/customize/icons";
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {
    cn,
    getRandomEncouragement,
    getRandomErrorMessage,
    normalizeVersetTitle,
    pickRandom,
    playSound,
    SoundList,
    stopAllSounds
} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {CloseConfirm, TransitionScreen} from "@/app/(main)/plaground/home/verses-list/play/components/closeConfirm";
import {useGameplayArea} from "@/hooks/useGameplay";
import {Verset} from "@/lib/db";
import {bookMapById} from "@/backend/mock/bible-book";
import {Heart, LoaderIcon} from "lucide-react";
import dynamic from 'next/dynamic'
import flashLotie from "@/effect/flash.json"
import starLotie from "@/effect/star.json"

const Lottie = dynamic(
    () => import('lottie-react'),
    {ssr: false}
)

const MAX_HEART = 4

export default function PlayPage() {

    const [selectedVertset, setSelectedVertset] = React.useState<Verset>()
    const [requestClose, setRequestClose] = React.useState<boolean>(false);
    const [endStateOpen, setEndStateOpen] = React.useState<boolean>(false);
    const [progress, setProgress] = useState(0)
    const [isEnded, setIsEnded] = React.useState(false);
    const [isWin, setIsWin] = React.useState(false);
    const [wrongCount, setWrongCount] = React.useState(0)
    const [hasInteracted, setHasInteracted] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [inFlash, setInFlash] = React.useState(false);
    const [inStar, setInStar] = React.useState(false);

    const {
        quizData,
        currentQuestion,
        currentIndex,
        completed,
        handleAnswer,
        nextQuestion,
        lives,
        setLives,
        score,

    } = useGameplayArea();

    useEffect(() => {
        function handleUserInteraction() {
            setHasInteracted(true);
            // On peut détacher l'event listener ici si on veut
        }

        window.addEventListener('click', handleUserInteraction, {once: true});
        return () => {
            window.removeEventListener('click', handleUserInteraction);
        };
    }, []);


    React.useEffect(() => {
        if (quizData.length && hasInteracted && !hasStarted) {
            playSound({path: SoundList.gameStarted})
            const out = setTimeout(() => {
                const soundThemeVolume = localStorage.getItem("soundTheme")
                playSound({
                    path: pickRandom([SoundList.theme2, SoundList.theme1]),
                    replay: true,
                    sound: soundThemeVolume ? +soundThemeVolume : 0
                })
                clearTimeout(out)
            }, 1000)
            setHasStarted(true)
        }
    }, [hasInteracted, quizData, hasStarted])


    React.useEffect(() => {
        if (completed) {
            playSound({path: SoundList.gameEnded})
            setIsEnded(true)
        }
    }, [completed])

    React.useEffect(() => {
        if (progress >= 50 && progress < 70) {
            setInFlash(true)
            playSound({path: SoundList.flash, sound: 0.4})

            const timer = setTimeout(() => {
                setInFlash(false)
                clearTimeout(timer)
            }, 2000)
        }

        if (progress >= 70) {
            setInStar(true)
            playSound({path: SoundList.thunder, sound: 0.2})

            const timer = setTimeout(() => {
                setInStar(false)
                clearTimeout(timer)
            }, 1600)
        }
    }, [progress])

    if (quizData.length === 0) {
        return <div>Loading...</div>;
    }

    // if (completed) {
    //     return <div>Quiz Completed! Great job!</div>;
    // }

    const onNextQuestion = () => {
        setSelectedVertset(undefined)
        setEndStateOpen(false)
        nextQuestion()
    }

    const onAnswer = () => {

        setEndStateOpen(true)
        const totalQuestions = quizData.length;

        if (currentQuestion && currentQuestion.isCorrect) {
            if (totalQuestions > 0) {
                const result = Math.round(
                    (((currentIndex + 1)) / totalQuestions) * 100
                )
                // const wrongResult = result * wrongCount
                const newProgress = result;
                setProgress(newProgress);
            }
            playSound({path: pickRandom([SoundList.sellectWin1, SoundList.sellectWin2, SoundList.sellectWin3])})
            setIsWin(true)
        } else {
            setWrongCount(wrongCount + 1)
            setLives(lives - 1)
            setIsWin(false)
            playSound({path: SoundList.gameLoosed})
        }
    }

    if (currentQuestion) {
        return (
            <div className={"px-[20px] py-[20px] flex flex-col gap-[40px] relative"}>
                <PlayProgress
                    progress={progress}
                    onCloseClick={() => setRequestClose(true)}
                    count={lives}
                />

                <div className={cn(
                    "h-screen top-0 absolute",
                    (inFlash || inStar) && "w-full"
                )}>

                    {inFlash && <Lottie
                        animationData={flashLotie}
                        loop={true}
                        autoplay={true}
                    />}
                    {inStar && <Lottie
                        animationData={starLotie}
                        loop={true}
                        autoplay={true}
                        width={300}
                        height={300}
                    />}
                </div>

                <PlayInfo
                    isOldError={currentQuestion.missedCount > 0 && !selectedVertset}
                    verset={currentQuestion.target}
                />
                <PlayPlayground
                    selectedVerse={selectedVertset}
                    verses={currentQuestion.outputsOptions}
                    onSelectVerset={v => {
                        setSelectedVertset(v)
                        handleAnswer(v)
                    }}
                />
                <PlayConfirm
                    selectedVerset={selectedVertset}
                    onConfirm={() => {
                        if (selectedVertset) {
                            console.log("On press")
                            onAnswer()
                        }
                    }}
                />
                <EndStateScreen
                    variant={isWin ? "success" : "error"}
                    state={endStateOpen ? "opened" : "closed"}
                    onConfirm={() => {
                        onNextQuestion()
                    }}
                />
                <ClosePartyScreen
                    state={requestClose ? "opened" : "closed"}
                    onCloseCancel={() => setRequestClose(false)}
                />

                {isEnded && (
                    <EndPartyScreen
                        score={10 - wrongCount}
                    />
                )}
            </div>
        )
    }
}

const PlayProgress: React.FC<{
    onCloseClick: () => void,
    progress: number,
    count: number
}> = ({
          onCloseClick,
          progress,
          count
      }) => {

    return (
        <div className={"flex items-center gap-[15px]"}>
            <button onClick={() => {
                onCloseClick()
            }}>
                <DCloseIcon/>
            </button>
            <ProgressBar
                progress={progress}
            />
            <HeartCount
                count={count}
            />
        </div>
    )
}

interface HeartCountProps {
    count: number
}

const HeartCount: React.FC<HeartCountProps> = ({count}) => {
    const [showAllHearts, setShowAllHearts] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAllHearts(false)
        }, 1000) // Show all hearts for 2 seconds before animating

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex items-center gap-2">
            <AnimatePresence>
                {showAllHearts ? (
                    Array.from({length: count}).map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 1, scale: 1}}
                            exit={{
                                opacity: 0,
                                scale: 0,
                                transition: {duration: 0.5, delay: index * 0.1},
                            }}
                        >
                            <Heart className="w-6 h-6 text-red-500 fill-red-500"/>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{type: "spring", stiffness: 260, damping: 20}}
                    >
                        <Heart className="w-6 h-6 text-red-500 fill-red-500"/>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="text-red-500 text-xl font-bold font-['Feather']">{count}</div>
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
                        progress >= 50 ? "from-[#ffd900] to-[#ffd900]/85" : "from-lime-400 to-lime-500"
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

const PlayInfo: React.FC<{ verset: Verset, isOldError: boolean }> = ({verset, isOldError}) => {

    return (
        <div className={"flex flex-col gap-[10px]"}>
            {isOldError && (
                <div className="text-[#ffd900] text-[22px] font-bold font-['Feather'] flex items-center gap-2">
                    <LoaderIcon/>
                    <div>Ancienne erreur !</div>
                </div>
            )}
            <div className="text-white text-xl font-bold font-['Feather']">
                Séléctionne le bon verset
            </div>
            <div
                className="text-white/80 text-base font-normal leading-[30px]"
            >
                {verset.content}
            </div>
        </div>
    )
}

const PlayConfirm: React.FC<{ selectedVerset: Verset | undefined, onConfirm: () => void }> = ({
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


const PlayPlayground: React.FC<{ onSelectVerset: (v: Verset) => void, verses: Verset[], selectedVerse?: Verset }> = ({
                                                                                                                         onSelectVerset,
                                                                                                                         verses,
                                                                                                                         selectedVerse
                                                                                                                     }) => {

    const handleClick = (verset: Verset) => {
        onSelectVerset(verset)
    }

    return (
        <div className="flex flex-col gap-4">
            <AnimatePresence>
                {verses.map((verse) => (
                    <div
                        key={verse.id}
                        // initial={{opacity: 1}}
                        // exit={{opacity: 0}}
                        // animate={{opacity: 1}}
                        // transition={{duration: 0.3}}
                    >
                        <Button
                            withSound={true}
                            soundMode={2}
                            size="default"
                            variant={selectedVerse?.id === verse.id ? "selected" : "neutral"}
                            className={cn(
                                "w-full flex justify-between items-center",
                                selectedVerse?.id !== verse.id ? "border-[#38454e]" : ""
                            )}
                            onClick={() => handleClick(verse)}
                        >
                            <span>{bookMapById.get(verse.book_num)?.label} {normalizeVersetTitle(verse)}</span>
                            <motion.div
                                className="text-5xl"
                                initial={{scale: 2}}
                                animate={{scale: selectedVerse?.id === verse.id ? [2, 2.2, 2] : 2}}
                                transition={{duration: 0.3}}
                            >
                                {selectedVerse?.id === verse.id
                                    ? <DHeartRedIcon/>
                                    : <DHeartGray/>
                                }
                            </motion.div>
                        </Button>
                    </div>
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
                <div
                    className={"w-full h-fit py-8 pt-6 px-5 gap-4 flex flex-col justify-between bg-[#213037]"}>
                    <div className={"flex items-center gap-[11px]"}>
                        <DFlagIcon className={cn(
                            isError ? "text-[#CE5D55]" : "text-[#92d233]"
                        )}/>
                        <div className={cn(
                            "text-[#92d233] text-xl font-bold font-['Feather']",
                            isError && "text-[#CE5D55]"
                        )}
                        >
                            {isError ? getRandomErrorMessage() : getRandomEncouragement()}
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


const ClosePartyScreen: React.FC<{ state: "closed" | "opened", onCloseCancel: () => void }> = ({
                                                                                                    state,
                                                                                                    onCloseCancel
                                                                                                }) => {

    const $router = useRouter()

    return (
        <CloseConfirm
            state={state}
            onCloseCancel={onCloseCancel}
            icon={<DXPIcon/>}
            title={"Tu veux vraiment arrêter ?"}
            subTitle={` Si tu arrete maintenant, tu perdras toutes ta progression et lors de ton prochain
                                entrainement
                                tu
                                devras recommencer to progrssion à zéro.`}
            cancelText={"Continuer"}
            performText={"Terminer la session"}
            performAction={() => {
                stopAllSounds();
                $router.push("/plaground/home/verses-list")
            }}
        />
    )
}

const EndPartyScreen: React.FC<{ score: number }> = ({score}) => {

    const $router = useRouter()

    return (
        <div
            className={"h-screen flex flex-col justify-between w-full px-[20px] bg-[#141f25] absolute top-0 left-0 overflow-hidden"}>
            <div>
            </div>
            <div className={"flex flex-col gap-[30px] items-center"}>
                {score <= 7 ? <div className={"text-[64px] text-center flex items-center justify-center"}>
                        😓
                    </div> :
                    <DMisteryBoxIcon width={50} height={50} className={"scale-150"}/>
                }
                <div>
                    <div className="text-[#ffd900] text-[22px] font-bold font-['Feather'] text-center">Entraînement
                        terminé !
                    </div>
                    {score <= 7 && <div className="text-[16px] text-center">
                        Ne t’en fais pas, tu feras mieux la prochaine fois !
                    </div>}
                </div>
                <div className={"flex gap-3 w-full"}>

                    {/*<div className={"flex-1"}>*/}
                    {/*    <StatItem*/}
                    {/*        icon={*/}
                    {/*            <DBook width={25} height={25}/>*/}
                    {/*        }*/}
                    {/*        title={"29895"}*/}
                    {/*        desc={"XP gagnés"}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className={"flex-1"}>
                        <StatItem
                            icon={
                                <DXPIcon width={25} height={25}/>
                            }
                            title={`${score}`}
                            desc={"Score"}
                        />
                    </div>

                </div>
            </div>
            <div className={"mb-8"}>
                <Button
                    variant={"default"}
                    className="w-full"
                    onClick={() => {
                        stopAllSounds();
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

