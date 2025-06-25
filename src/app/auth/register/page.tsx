"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useMemo} from "react";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {useRegister} from "@/hooks/_screens/useAuth";


export default function LoginPage() {

    const {
        email, setEmail,
        password, setPassword,
        pseudo, setPseudo,
        waiting,
        handlerRegister
    } = useRegister()

    const loginButtonIsDisabled = useMemo(() => {
        return waiting || (!pseudo || !password || !email)
    }, [waiting, pseudo, password, email])

    return (
        <div className="flex flex-col gap-[26px]">
            <div className="flex items-center justify-between w-full">
                <Link href="/auth/login">
                    <button
                        className="text-white/70 hover:text-white bg-white/[0.01] hover:bg-white/5 size-10 flex items-center justify-center border border-white/[0.01] hover:border-white/[0.02] rounded-full transition-all duration-200 backdrop-blur-sm">
                        <ArrowLeftIcon size={18} strokeWidth={2.5}/>
                    </button>
                </Link>
                <h1 className="text-white/20 text-lg font-['Feather'] text-center">
                    Créer un compte
                </h1>
                <div></div>
            </div>

            <div className="flex flex-col gap-[10px]">
                {/* Email */}
                <Input
                    placeholder="Adresse email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Pseudo */}
                <Input
                    placeholder="Pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                />

                {/* Password */}
                <Input
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Link
                    href="/plaground/use-term"
                    onClick={(e) => {
                        e.preventDefault();
                        void handlerRegister();
                    }}
                    className="flex items-center justify-center w-full"
                >
                    <Button
                        disabled={loginButtonIsDisabled}
                        variant={loginButtonIsDisabled ? "disabled" : "default"}
                        className="w-full"
                    >
                        Créer le compte
                    </Button>
                </Link>

                {/* Lien si on a déjà un compte */}
                <Link href="/auth/login" className="flex items-center justify-center w-full">
                    <Button variant="text">
                        J'ai déjà un compte
                    </Button>
                </Link>
            </div>
        </div>
    );
}
