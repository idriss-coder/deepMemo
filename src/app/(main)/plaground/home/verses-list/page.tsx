"use client"

import {DArrowTop, DBook, DHeartGray} from "@/components/customize/icons";
import {Button} from "@/components/ui/button";
import {BackButton} from "@/components/customize/utils";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function VersetListPage() {

    return (
        <div>
            <HeroSection/>
            <div className={"px-[20px] mt-[20px] flex flex-col gap-[24.5px]"}>
                <NavSection/>
                <NewVerset/>
                <EmptyVerses/>
                <VersetItem/>
            </div>
        </div>
    )
}

const HeroSection = () => {

    const $router = useRouter()

    return (
        <div
            className={"h-[380px] px-[18px] bg-gradient-to-b from-[#5f3a9a] to-[#1a143a]"}>
            <BackButton link={"/plaground/home"}/>

            <div className={"flex flex-col items-center justify-center gap-[30px]"}>
                <DBook width={118} height={109}/>

                <div
                    className="w-[228px] text-center text-white text-xl font-bold font-['Feather']"
                >
                    Entraîne-toi à
                    memoriser les versets par coeur.
                </div>

                <Button
                    variant={"purple"}
                    disabled={false}
                    className={"w-full"}
                    onClick={() => {
                        $router.push("/plaground/home/verses-list/play");
                    }}
                >
                    DEMARRER L’ENTRAINEMENT
                </Button>
            </div>
        </div>
    )
}

const NavSection = () => {

    return (
        <div className={"flex justify-between items-center"}>
            <div className="text-white text-xl font-bold font-['Feather']">Mes versets</div>
            <VersetCount/>
        </div>
    )
}

const VersetCount = () => {

    return (
        <div
            className={"w-[47px] h-6 p-0.5 bg-gradient-to-r from-[#2dabbc] to-[#42e1b1] rounded-sm flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden"}>
            <div
                className="h-full w-full bg-black rounded-[1px] flex justify-center items-center">
                <div className="text-white text-xl font-bold font-['Feather']">00</div>
            </div>
        </div>
    )
}

const NewVerset = () => {

    return (
        <div>
            <Link href={"/plaground/home/verses-list/new"}>
                <Button variant={"dashed"} className={"w-full"}>Nouveau verset.</Button>
            </Link>
        </div>
    )
}

const EmptyVerses = () => {

    return (
        <div className={"flex flex-col items-center gap-[11.5px]"}>
            <DArrowTop/>
            <div className="w-[341px] text-center text-[#4e5b64] text-sm font-normal leading-snug">Tu n’a
                pas encore des versets pour t’entrainer. Clique ici pour ajouter tes versets favorites pour
                l’entrainement.
            </div>
        </div>
    )
}

const VersetItem = () => {

    return (
        <div>
            <Button variant={"neutral"} className={"w-full flex justify-between border-[#38454e]"}>
                <div>Mat. 24:14</div>
                <div className={"text-5xl"}>
                    <DHeartGray/>
                </div>
            </Button>
        </div>
    )
}