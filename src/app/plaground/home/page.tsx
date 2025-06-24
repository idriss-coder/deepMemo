"use client"

import {DBook, DCloseIcon, DSettingsIcon} from "@/components/customize/icons";
import {cn, maskFirstTwo} from "@/lib/utils";
import Link from "next/link";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {SoundThemRegulator} from "@/app/plaground/home/_components/sound";
import {AnimatePresence, motion} from "framer-motion";
import {getBgColorFromLetter} from "@/components/customize/utils";
import {useProfile, useSignOut} from "@/hooks/_screens/useAuth";
import {toast} from "sonner";
import {useCategories} from "@/app/admin/dashboard/_hooks/useCategories";

export default function HomPage() {

    const {categories, loading} = useCategories({includeDisabled: false});

    return (
        <div>
            <TrainingUser/>
            <div className={"px-[20px] py-[34px]"}>
                <div className={"flex flex-col gap-[15px]"}>

                    <div>
                        <h1 className="text-white text-xl font-bold font-['Feather']">Entrainements</h1>
                    </div>

                    <div className={"flex flex-col gap-[15px]"}>
                        <Link href={"/plaground/home/verses-list"}>
                            <TrainingItem label={"Mes versets bibliques"}/>
                        </Link>
                        {loading ? "Un instant..." : (
                            categories?.map((ctg, k) => (
                                <Link
                                    key={k}
                                    href={`/plaground/home/verses-list?training_id=${ctg._id}`}
                                >
                                    <TrainingItem
                                        label={ctg.name}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TrainingItem: React.FC<{ label?: string }> = ({label}) => {

    const [load, setLoad] = useState(false)

    return (
        <button
            onClick={() => setLoad(true)}
            className={cn(
                "w-full h-[79px] pl-[30px] bg-[#141f25] rounded-[15px] border-l-2 border-r-2 border-t-2 border-b-4 border-[#38454e] justify-between items-center inline-flex overflow-hidden",
                "hover:border-b-[5px]",
                "active:border-b-2",
                "transition",
                "transition"
            )}
        >
            <div
                className="text-white/90 text-base font-bold font-['Feather']">{load ? "Un instant..." : label}</div>
            <DBook/>
        </button>
    )
}

const TrainingUser = () => {

    const {profile: user} = useProfile()
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const $router = useRouter()
    const {handlerSignOut} = useSignOut()

    const onSignOut = () => {
        void handlerSignOut()
        $router.push("/auth/login")
        toast.info("Vous avez été déconnecté")
    }

    return (
        <div
            className={"w-full relative h-[336px] bg-gradient-to-b from-[#5f3a9a] to-[#1a143a] overflow-hidden flex items-center justify-center"}>
            <div className={"absolute top-0 w-full pt-4 flex justify-end items-end px-5"}>
                <button onClick={() => setSettingsOpen(!settingsOpen)}>
                    {settingsOpen
                        ? <DCloseIcon className={""}/>
                        : <DSettingsIcon className={""}/>
                    }
                </button>
            </div>
            <div className={"flex flex-col items-center justify-center gap-8"}>
                <UerAvatarWrap variant={settingsOpen ? "sm" : "default"}/>
                {settingsOpen && <>
                    <div className={"flex flex-col items-center justify-center gap-8"}>
                        <div className={"justify-start items-center gap-[26px] inline-flex"}>
                            <div className="text-white/90 text-base font-bold font-['Feather']">{user?.pseudo}</div>
                            <div className="w-px h-[42px] relative bg-white/10"/>
                            <div
                                className="text-white/90 text-base font-bold font-['Feather']">{maskFirstTwo(user?.email)}</div>
                        </div>
                        <div className="flex items-center space-x-4 w-full">
                            <label
                                htmlFor="sound-theme"
                                className="text-white/90 text-base font-bold font-['Feather']"
                            >
                                Musique
                            </label>
                            <div className={"flex-1"}>
                                <SoundThemRegulator/>
                            </div>
                        </div>
                        <Button
                            variant={"textRed"}
                            onClick={() => {
                                onSignOut()
                            }}
                        >
                            Déconnexion
                        </Button>
                    </div>
                </>}
            </div>
        </div>
    )
}

const UerAvatarWrap: React.FC<{ variant?: "default" | "sm" }> = ({
                                                                     variant,
                                                                 }) => {
    const {profile: user, showFullPseudo, userAvatar} = useProfile()
    const isSM = variant === "sm";


    return (
        <div
            className={cn(
                "size-[115px] bg-[#ffab33] rounded-full flex items-center justify-center relative",
                isSM && "size-[90px]"
            )}
            style={{
                background: getBgColorFromLetter(user?.pseudo),
            }}
        >
            <div
                className="w-[35px] h-[43px] text-[#0c1216] text-4xl font-bold font-['Feather'] flex flex-col items-center justify-center">

                {/* On utilise AnimatePresence pour animer la transition */}
                <AnimatePresence mode="wait">
                    {user && (
                        <motion.span
                            key={showFullPseudo ? "fullPseudo" : "shortPseudo"}
                            initial={{opacity: 0,}}
                            animate={{opacity: 1,}}
                            exit={{opacity: 0,}}
                            transition={{duration: 0.2}}
                            className="text-4xl"
                        >
                            {showFullPseudo ? <span className={"text-lg"}>{user.pseudo}</span> : userAvatar}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Petit label "Bonjour" en bas */}
            <div
                className="absolute -bottom-2 h-[29px] px-3.5 py-[5px]
           bg-gradient-to-b from-[#28144f] to-[#06030a]
           rounded-[99px] flex items-center gap-[9px] overflow-hidden
           text-white text-[15px] font-bold font-['Feather']"
            >
                <div className="w-[7px] h-[7px] bg-[#18f850] rounded-full"/>
                <div>Bonjour</div>
            </div>
        </div>
    );
};