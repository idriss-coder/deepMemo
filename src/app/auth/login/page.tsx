"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function LoginPage() {

    const $router = useRouter()

    const onLogin = () => {
        $router.push("/plaground/home")
    }

    return (
        <div className={"flex flex-col gap-[26px]"}>
            <h1 className="text-white/20 text-lg  font-['Feather'] text-center">Connexion</h1>
            <div className={"flex flex-col gap-[10px]"}>
                <Input placeholder={"Numéro de téléphone"}/>
                <Input placeholder={"Mot de passe"}/>
            </div>
            <div className={"flex flex-col gap-3"}>
                <Button onClick={onLogin} variant={"default"}>Se conecter</Button>
                <Link href={"/auth/register"} className={"flex items-center justify-center w-full"}>
                    <Button variant={"text"}>Je n'ai pas encore de compte</Button>
                </Link>
            </div>
        </div>
    )
}