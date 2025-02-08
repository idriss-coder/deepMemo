"use client"

import {DBook, DCloseIcon, DSettingsIcon} from "@/components/customize/icons";
import {cn} from "@/lib/utils";
import Link from "next/link";
import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Slider} from "@/components/ui/slider";

export default function HomPage() {

    return (
        <div>
            <TrainingUser/>
            <div className={"px-[20px] py-[34px]"}>
                <div className={"flex flex-col gap-[15px]"}>

                    <div>
                        <h1 className="text-white text-xl font-bold font-['Feather']">Entrainements</h1>
                    </div>

                    <div>
                        <Link href={"/plaground/home/verses-list"}>
                            <TrainingItem/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TrainingItem = () => {
    return (
        <button
            className={cn(
                "w-full h-[79px] pl-[30px] bg-[#141f25] rounded-[15px] border-l-2 border-r-2 border-t-2 border-b-4 border-[#38454e] justify-between items-center inline-flex overflow-hidden",
                "hover:border-b-[5px]",
                "active:border-b-2",
                "transition",
                "transition"
            )}
        >
            <div className="text-white/90 text-base font-bold font-['Feather']">Versets bibliques</div>
            <DBook/>
        </button>
    )
}

const TrainingUser = () => {

    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const $router = useRouter()

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
                            <div className="text-white/90 text-base font-bold font-['Feather']">John Doe</div>
                            <div className="w-px h-[42px] relative bg-white/10"/>
                            <div className="text-white/90 text-base font-bold font-['Feather']">+2376********</div>
                        </div>
                        <div className="flex items-center space-x-4 w-full">
                            <label
                                htmlFor="sound-theme"
                                className="text-white/90 text-base font-bold font-['Feather']"
                            >
                                Musique
                            </label>
                            <div className={"flex-1"}>
                                <Slider
                                    defaultValue={[localStorage.getItem("soundTheme") ? +(localStorage.getItem("soundTheme")) : 0.2]}
                                    max={1} step={0.1}
                                    onValueChange={(v) => {
                                        localStorage.setItem("soundTheme", JSON.stringify(v[0]))
                                    }}
                                />
                            </div>
                        </div>
                        <Button
                            variant={"textRed"}
                            onClick={() => {
                                $router.push("/auth/login")
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

const UerAvatarWrap: React.FC<{ variant?: "default" | "sm" }> = ({variant}) => {

    const isSM = variant == "sm"

    return (
        <div className={cn(
            "size-[115px] bg-[#ffab33] rounded-full flex items-center justify-center relative",
            isSM && "size-[90px]"
        )}>
            <div className="w-[35px] h-[43px] text-[#0c1216] text-4xl font-bold font-['Feather']">IL</div>
            <div
                className="absolute -bottom-2 h-[29px] px-3.5 py-[5px] bg-gradient-to-b from-[#28144f] to-[#06030a] rounded-[99px] justify-start items-center gap-[9px] inline-flex overflow-hidden w-fit text-nowrap">
                <div className="w-[7px] h-[7px] relative bg-[#18f850] rounded-[99px]"/>
                <div className="text-white text-[15px] font-bold font-['Feather']">Bonjour</div>
            </div>
        </div>
    )
}