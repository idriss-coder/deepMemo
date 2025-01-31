import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";

export default function LoginPage() {

    return (
        <div className={"flex flex-col gap-[26px]"}>
            <div className={"flex items-center justify-between w-full"}>
                <Link href={"/login"}>
                    <button className={"text-white/65"}>
                        <ArrowLeftIcon/>
                    </button>
                </Link>
                <h1 className="text-white/20 text-lg  font-['Feather'] text-center">Creer un compte</h1>
                <div></div>
            </div>
            <div className={"flex flex-col gap-[10px]"}>
                <Input placeholder={"Numéro de téléphone"}/>
                <Input placeholder={"Votre pseudo"}/>
                <Input placeholder={"Mot de passe"}/>
            </div>
            <div className={"flex flex-col gap-3"}>
                <Link href={"/plaground/use-term"} className={"flex items-center justify-center w-full"}>
                    <Button variant={"default"} className={"w-full"}>S'inscrire</Button>
                </Link>
                <Link href={"/login"} className={"flex items-center justify-center w-full"}>
                    <Button variant={"text"}>J'ai déjà un compte</Button>
                </Link>
            </div>
        </div>
    )
}