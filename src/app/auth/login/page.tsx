"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useMemo} from "react";
import Link from "next/link";
import {useLogin} from "@/hooks/_screens/useAuth";

export default function LoginPage() {

    const {
        handlerLogin,
        email,
        setEmail,
        password,
        setPassword,
        waiting
    } = useLogin()

    const onLogin = () => {
        void handlerLogin()
    }

    const isDisabled = useMemo(() => {
        return waiting || (!email || !password)
    }, [waiting, email, password])

    return (
        <div className={"flex flex-col gap-[26px]"}>
            <h1 className="text-white/20 text-lg  font-['Feather'] text-center">Connexion</h1>
            <div className={"flex flex-col gap-[10px]"}>
                <Input
                    placeholder={"Adresse email"}
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder={"Mot de passe"}
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={"flex flex-col gap-3"}>
                <Link
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (!isDisabled) onLogin()
                    }}
                    href={"/plaground/home"}
                >
                    <Button
                        className={"w-full"}
                        disabled={isDisabled}
                        variant={isDisabled ? "disabled" : "default"}
                    >
                        Se conecter
                    </Button>
                </Link>
                <Link
                    href={"/auth/register"}
                    className={"flex items-center justify-center w-full"}
                >
                    <Button variant={"text"}>Je n'ai pas encore de compte</Button>
                </Link>
            </div>
        </div>
    )
}