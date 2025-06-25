"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useMemo} from "react";
import Link from "next/link";
import {useLogin} from "@/hooks/_screens/useAuth";
import {X} from "lucide-react";

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
            <div className="flex items-center justify-between w-full">
                <Link href="/plaground/home">
                    <button
                        className="text-white/70 hover:text-white bg-white/[0.01] hover:bg-white/5 size-10 flex items-center justify-center border border-white/[0.01] hover:border-white/[0.02] rounded-full transition-all duration-200 backdrop-blur-sm">
                        <X size={18} strokeWidth={2.5}/>
                    </button>
                </Link>
                <h1 className="text-white/20 text-lg font-['Feather'] text-center">
                    Se connecter à DeepMemo
                </h1>
                <div></div>
            </div>
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