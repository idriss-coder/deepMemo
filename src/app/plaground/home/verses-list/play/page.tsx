"use client"

import {Button} from "@/components/ui/button";
import {
    DCloseIcon,
    DExplainIcon,
    DFlagIcon,
    DGuardIcon,
    DHeartGray,
    DHeartRedIcon,
    DMisteryBoxIcon,
    DXPIcon
} from "@/components/customize/icons";
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useMemo, useState} from "react";
import {
    cn,
    Difficult,
    getRandomEncouragement,
    getRandomErrorMessage,
    missedAnswerMessages,
    normalizeVersetTitle,
    pickRandom,
    playSound,
    SoundList,
    stopAllSounds
} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {CloseConfirm, TransitionScreen} from "@/app/plaground/home/verses-list/play/components/closeConfirm";
import {useGameplayArea} from "@/hooks/useGameplay";
import {Verset} from "@/lib/db";
import {bookMapById, SimpleBook} from "@/backend/mock/bible-book";
import {Heart, LoaderIcon} from "lucide-react";
import dynamic from 'next/dynamic'
import flashLotie from "@/effect/flash.json"
import starLotie from "@/effect/star.json"
import {DifficultSelectScreen} from "@/app/plaground/home/verses-list/play/stage/dificult-select";
import {HardPlayground} from "@/app/plaground/home/verses-list/play/stage/hard-playground";
import accEnabled from "@/effect/acc-enabled.json";

const Lottie = dynamic(
    () => import('lottie-react'),
    {ssr: false}
)


const BONUS_EFFECT_STATE = 2

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
    const [accWinCount, setAccWinCount] = React.useState(0);

    const [hardSelected, setHardSelected] = React.useState<SimpleBook>({});

    const [difficultOpen, setDifficultOpen] = React.useState(true)

    const {
        quizData,
        currentQuestion,
        currentIndex,
        completed,
        handleAnswer,
        nextQuestion,
        lives,
        setLives,
        difficult,
        setDifficult,
    } = useGameplayArea();

    useEffect(() => {
        return () => {
            stopAllSounds()
        }
    }, [])

    const isHard = useMemo(() => {
        return difficult == Difficult.HARD
    }, [difficult])

    useEffect(() => {
        if (difficult) {
            localStorage.setItem("difficult", JSON.stringify(difficult))
        }
    }, [difficult]);

    useEffect(() => {
        const storedDifficult = localStorage.getItem("difficult");
        if (storedDifficult) {
            setDifficult(JSON.parse(storedDifficult) as Difficult)
        } else setDifficult(Difficult.CLASSIC)
    }, [setDifficult]);

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
        if (accWinCount == BONUS_EFFECT_STATE) {
            setInFlash(true)
            playSound({path: SoundList.flash, sound: 0.4})

            const timer = setTimeout(() => {
                setInFlash(false)
                clearTimeout(timer)
            }, 2000)
        }

        if (accWinCount > BONUS_EFFECT_STATE) {
            setInStar(true)
            playSound({path: SoundList.star, sound: 0.2})

            const timer = setTimeout(() => {
                setInStar(false)
                clearTimeout(timer)
            }, 1600)
        }
    }, [accWinCount])

    if (quizData.length === 0) {
        return <div>Loading...</div>;
    }

    // if (completed) {
    //     return <div>Quiz Completed! Great job!</div>;
    // }

    const onNextQuestion = () => {
        setSelectedVertset(undefined)
        setHardSelected({})
        setEndStateOpen(false)
        nextQuestion()
    }

    const onAnswer = () => {

        setEndStateOpen(true)
        const totalQuestions = quizData.length;

        if (currentQuestion && currentQuestion.isCorrect) {

            const currentWinCount = accWinCount + 1
            setAccWinCount(currentWinCount)

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
            setAccWinCount(0)
            setWrongCount(wrongCount + 1)
            setLives(lives - 1)
            setIsWin(false)
            playSound({path: SoundList.gameLoosed})
        }
    }

    if (currentQuestion) {
        return (
            <div className={"px-[20px] py-[20px] flex flex-col gap-[30px] relative mb-32"}>

                <DifficultSelectScreen
                    isOpen={difficultOpen}
                    onDifficultChange={(d) => {
                        setDifficult(d)
                    }}
                    selected={difficult}
                    onClose={() => {
                        setDifficultOpen(false)
                    }}
                />

                {!difficultOpen && (
                    <PlayProgress
                        acc={accWinCount}
                        progress={progress}
                        onCloseClick={() => setRequestClose(true)}
                        count={lives}
                        withEffect={accWinCount >= BONUS_EFFECT_STATE}
                    />
                )}

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
                    hardInfos={hardSelected}
                    mode={difficult}
                    isOldError={isHard ? (currentQuestion.missedCount > 0 && !hardSelected) : (currentQuestion.missedCount > 0 && !selectedVertset)}
                    verset={currentQuestion.target}
                    verses={currentQuestion.outputsOptions}
                />
                {!difficultOpen && <>
                    {isHard ?
                        <HardPlayground
                            selected={hardSelected}
                            verses={currentQuestion.outputsOptions}
                            onSelect={v => {
                                setHardSelected(v)
                                if (v.bookId && v.chapter && v.verses) {
                                    handleAnswer({
                                        book_num: v.bookId,
                                        chapter_num: v.chapter,
                                        verses_num: v.verses
                                    } as Verset, difficult)
                                }
                            }}
                        /> :
                        <PlayPlayground
                            selectedVerse={selectedVertset}
                            verses={currentQuestion.outputsOptions}
                            onSelectVerset={v => {
                                setSelectedVertset(v)
                                handleAnswer(v, difficult)
                            }}
                        />
                    }
                </>}
                <PlayConfirm
                    mode={difficult}
                    hardInfos={hardSelected}
                    selectedVerset={selectedVertset}
                    onConfirm={() => {
                        if (!isHard && selectedVertset) {
                            onAnswer()
                        }

                        if (isHard && hardSelected) {
                            onAnswer()
                        }
                    }}
                />
                <EndStateScreen
                    correctVerset={`${bookMapById.get(currentQuestion.target.book_num)?.label} ${normalizeVersetTitle(currentQuestion.target)}`}
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

interface PlayProgressProps {
    onCloseClick: () => void;
    progress: number;
    count: number;
    withEffect: boolean;
    acc: number; // successiveWinCount
}

const PlayProgress: React.FC<PlayProgressProps> = ({
                                                       onCloseClick,
                                                       progress,
                                                       count,
                                                       withEffect,
                                                       acc: successiveWinCount,
                                                   }) => {
    return (
        <div className="relative">
            <div className="flex items-center gap-[15px] relative">
                <button onClick={onCloseClick}>
                    <DCloseIcon/>
                </button>
                <ProgressBar withEffect={withEffect} progress={progress}/>
                <HeartCount count={count}/>
            </div>

            <AnimatePresence mode="popLayout">
                {withEffect && (
                    <motion.div
                        key={successiveWinCount}
                        className="flex items-center justify-center gap-1 top-1 w-full absolute -bottom-9"
                        initial={{scale: 0.5, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.5, opacity: 0}}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15
                        }}
                    >
                        <DGuardIcon/>
                        <div className="text-center text-[#ffc800] text-xs font-normal">
                            {successiveWinCount} d’affilés
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

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
    }, [count])

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


const ProgressBar: React.FC<{ progress: number, withEffect: boolean }> = ({progress, withEffect}) => {

    return (
        <div className={"flex-1 relative"}>
            <div className={"-mb-[70px] w-[60px] h-[60px] absolute -top-5 -right-3"}>
                {withEffect && <Lottie
                    animationData={accEnabled}
                    loop={true}
                    autoplay={true}
                    width={60}
                    height={60}
                />}
            </div>
            <div className={cn(
                "relative h-[18px] overflow-hidden  rounded-full  bg-[#38444d] transition-all",
            )}>
                <motion.div
                    className={cn(
                        "absolute  top-0 left-0 h-full bg-gradient-to-r ",
                        withEffect ? "from-[#ffd900] to-[#ffd900]/85" : "from-lime-400 to-lime-500"
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
                        (<div className="w-[85%] h-[5px] opacity-25 bg-white transition-all rounded-[30px] ml-1 mt-1"/>)
                    }
                </motion.div>
            </div>
        </div>
    )
}

const PlayInfo: React.FC<{
    verset: Verset,
    isOldError: boolean,
    hardInfos?: SimpleBook,
    mode?: Difficult,
    verses: Verset[]
}> = ({
          verset,
          isOldError,
          hardInfos,
          mode
      }) => {

    const playState = useMemo(() => {
        if (mode == Difficult.CLASSIC) return "Séléctionne le bon verset"

        if (!hardInfos?.bookId) return "Séléctionne le bon livre"
        if (hardInfos?.bookId && !hardInfos.chapter) return "Séléctionne le chapitre"
        if (hardInfos?.chapter) return "Séléctionne le(s) verset(s)"
    }, [hardInfos, mode])

    return (
        <div className={"flex flex-col gap-[10px]"}>
            {isOldError && (
                <div className="text-[#ffd900] text-[22px] font-bold font-['Feather'] flex items-center gap-2">
                    <LoaderIcon/>
                    <div>Ancienne erreur !</div>
                </div>
            )}
            <div className="text-white text-xl font-bold font-['Feather']">
                {playState}
            </div>
            <div
                className="text-white/80 text-base font-normal leading-[30px]"
            >
                {verset.content}
            </div>
        </div>
    )
}

const PlayConfirm: React.FC<{
    selectedVerset: Verset | undefined,
    onConfirm: () => void,
    hardInfos: SimpleBook,
    mode?: Difficult
}> = ({
          selectedVerset,
          onConfirm,
          mode,
          hardInfos,
      }) => {

    const enabled = useMemo(() => {
        if (mode == Difficult.HARD) {
            return (hardInfos.bookId && hardInfos.chapter && hardInfos.verses)
        } else {
            return !!selectedVerset
        }
    }, [selectedVerset, mode, hardInfos])

    return (
        <motion.div
            className="px-[20px] py-8 flex flex-col gap-4 items-center justify-center bg-gradient-to-b from-[#141f25]/0 via-[#141f25] to-[#141f25] fixed bottom-0 right-0 w-full"
            initial={{opacity: 0, y: 0}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2, duration: 0.3}}
        >
            {/*<div className={"flex items-center justify-start gap-3 w-full"}>*/}
            {/*    <DBookIcon className={"text-green-500"} width={20} height={20}/>*/}
            {/*    <div*/}
            {/*        className="text-[#4e5b64] text-sm font-normal leading-snug"*/}
            {/*    >*/}
            {/*        Sélecttionne le chapitre*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Button
                variant={enabled ? "green" : "disabled"}
                className="w-full"
                disabled={!enabled}
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
    onConfirm: () => void,
    correctVerset: string
}> = ({variant, state, onConfirm, correctVerset}) => {

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
                    {isError && <div className={"flex justify-between items-center"}>
                        <div className={"flex flex-col gap-1"}>
                            <div
                                className="text-[#92d233] text-sm font-normal leading-snug"
                            >
                                {pickRandom(missedAnswerMessages)} :
                            </div>
                            <div className="text-white/90 text-base font-bold font-['Feather']">{correctVerset}</div>
                        </div>
                        <DExplainIcon className={"text-sm text-gray-600"}/>
                    </div>}
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
            subTitle={`"Si tu arrêtes maintenant, tu perdras toute ta progression. Lors de ta prochaine session, tu devras tout reprendre à zéro.`}
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
            <div></div>
            <div className={"mb-8 py-8 px-5 fixed bottom-0 right-0 w-full"}>
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

