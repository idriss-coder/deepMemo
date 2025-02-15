"use client"

import {DArrowTop, DBook, DHeartGray} from "@/components/customize/icons";
import {Button} from "@/components/ui/button";
import {BackButton} from "@/components/customize/utils";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useMemo} from "react";
import {Verset} from "@/lib/db";
import {Book, bookMapById} from "@/backend/mock/bible-book";
import {useVerses} from "@/hooks/useVerses";
import {normalizeVersetTitle} from "@/lib/utils";

export default function VersetListPage() {
    const {myVerses} = useVerses()

    return (
        <div>
            <HeroSection verses={myVerses}/>
            <div className={"px-[20px] mt-[20px] flex flex-col gap-3"}>
                <NavSection versetCount={myVerses.length}/>
                <NewVerset/>
                {myVerses.length < 5 && <EmptyVerses verses={myVerses}/>}
                <VersetListView verses={myVerses}/>
            </div>
        </div>
    )
}

const VersetListView: React.FC<{ verses: Verset[] }> = ({verses}) => {
    return (
        <div className={"flex flex-col gap-3"}>
            {verses.map(v => (
                <VersetItem
                    verset={v}
                    key={v.id}
                />
            ))}
        </div>
    )
}

const HeroSection: React.FC<{ verses: Verset[] }> = ({verses}) => {

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
                    variant={verses.length >= 5 ? "purple" : "disabled"}
                    disabled={!(verses.length >= 5)}
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

const NavSection: React.FC<{ versetCount: number }> = ({versetCount}) => {
    return (
        <div className={"flex justify-between items-center"}>
            <div className="text-white text-xl font-bold font-['Feather']">Mes versets</div>
            <VersetCount count={versetCount}/>
        </div>
    )
}

const VersetCount: React.FC<{ count: number }> = ({count}) => {

    return (
        <div
            className={"w-[47px] h-6 p-0.5 bg-gradient-to-r from-[#2dabbc] to-[#42e1b1] rounded-sm flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden"}>
            <div
                className="h-full w-full bg-black rounded-[1px] flex justify-center items-center">
                <div className="text-white text-xl font-bold font-['Feather']">{count}</div>
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

interface EmptyVersesProps {
    verses: Verset[];
}

const EmptyVerses: React.FC<EmptyVersesProps> = ({verses}) => {
    const verseCount = verses.length;
    const needed = 5 - verseCount;

    return (
        <div className="flex flex-col items-center gap-[11.5px]">
            <DArrowTop/>
            <div className="w-[341px] text-center text-[#4e5b64] text-sm font-normal leading-snug">
                {verseCount === 0 ? (
                    <span>
            Holà <strong>aventurier biblique</strong> ! Tu n’as pas encore
            ajouté de verset favori. Clique ici pour en ajouter et débloquer ta
            première mission&nbsp;!
          </span>
                ) : needed > 0 ? (
                    <span>
            Super, tu as déjà {verseCount} verset(s) favori(s) ! Encore{" "}
                        <strong>{needed}</strong> à ajouter pour lancer l’entraînement et
            décrocher la victoire&nbsp;!
          </span>
                ) : (
                    <span>
            Wohoo&nbsp;! Tu as suffisamment de versets pour démarrer le quiz.
            Prépare-toi et montre de quoi tu es capable&nbsp;!
          </span>
                )}
            </div>
        </div>
    );
};

const VersetItem: React.FC<{ verset: Verset }> = ({verset}) => {

    const versetTitle = useMemo(() => normalizeVersetTitle(verset), [verset])

    const $router = useRouter()

    const book = bookMapById.get(verset.book_num) as Book


    return (
        <div>
            <Button
                variant={"neutral"}
                className={"w-full flex justify-between border-[#38454e]"}
                onClick={() => {
                    $router.push((`/plaground/home/verses-list/new/infos?book_id=${verset.book_num}&verset_id=${verset.id}`))
                }}
            >
                <div>{book.label} {versetTitle}</div>
                <div className={"text-5xl"}>
                    <DHeartGray className={"scale-[2]"}/>
                </div>
            </Button>
        </div>
    )
}