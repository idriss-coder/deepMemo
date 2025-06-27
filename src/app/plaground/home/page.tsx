"use client"

import {DBook, DCloseIcon, DSettingsIcon, OldBook} from "@/components/customize/icons";
import {cn, maskFirstTwo} from "@/lib/utils";
import Link from "next/link";
import React, {Suspense, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {SoundThemRegulator} from "@/app/plaground/home/_components/sound";
import {AnimatePresence, motion} from "framer-motion";
import {getBgColorFromLetter} from "@/components/customize/utils";
import {useProfile, useSignOut} from "@/hooks/_screens/useAuth";
import {toast} from "sonner";
import {useCategories} from "@/app/admin/dashboard/_hooks/useCategories";
import {ArrowRight} from "lucide-react";
import logoutUser from "./_ico//logout_user.png"
import Image from "next/image";

export default function HomPage() {

    const {categories, loading} = useCategories({includeDisabled: false, excludeVersets: true});
    const $router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const {profile} = useProfile()

    return (
        <div>
            {/* Login Modal */}
            <LoginRequiredModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={() => {
                    setShowLoginModal(false)
                    $router.push("/auth/login")
                }}
            />
            <UserHero
            />
            <div className={"px-[20px] py-[34px]"}>
                <div className={"flex flex-col gap-[15px]"}>

                    <div>
                        <h1 className="text-white text-xl font-bold font-['Feather']">Entrainements</h1>
                    </div>
                    <div className={"flex flex-col gap-[15px]"}>
                        {loading ? (
                            <div className={"w-full h-[79px] bg-bgPrimarySecondary rounded-[15px] animate-pulse"}></div>
                        ) : (
                            categories?.map((ctg: any, k: number) => (
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
                        <Link onClick={e => {
                            if (!profile) {
                                e.preventDefault();
                                e.stopPropagation()
                                setShowLoginModal(true)
                            }
                        }} href={"/plaground/home/verses-list"}>
                            <TrainingItem isSecond={true} label={"Mes versets bibliques"}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TrainingItem: React.FC<{ label?: string, isSecond?: boolean }> = ({label, isSecond}) => {

    const {profile} = useProfile()
    const [load, setLoad] = useState(false)
    useEffect(() => {
        const timeOd = setTimeout(() => {
            if (!profile && isSecond) {
                setLoad(false)
                clearTimeout(timeOd)
            }
        }, 700)
    }, [profile, load, isSecond]);

    return (
        <button
            onClick={() => setLoad(true)}
            className={cn(
                "w-full h-[79px] pl-5 bg-[#141f25] rounded-[15px] border-l-2 border-r-2 border-t-2 border-b-4 border-[#38454e] justify-between items-center inline-flex overflow-hidden",
                "hover:border-b-[5px]",
                "active:border-b-2",
                "transition",
                "relative",
            )}
        >
            {isSecond && <div
                className={"bg-[#92D233]/30 size-1 rounded-full absolute top-4 left-4 animate-pulse"}></div>}
            <div
                className="text-white/90 text-base font-bold font-['Feather'] text-left">{load ? "Un instant..." : label}</div>
            <div>
                {isSecond ? <OldBook width={60} className={"pr-3"}/> : <DBook width={60} className={"pr-3"}/>}
            </div>
        </button>
    )
}

const UserHero = () => {

    const {profile: user} = useProfile()
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const {handlerSignOut} = useSignOut()

    const onSignOut = () => {
        void handlerSignOut()
        if (window) {
            window.location = `/auth/login` as unknown as Location
        }

        toast.info("Vous avez été déconnecté")
    }


    return (
        <>
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
                    <Suspense fallback={<div>...</div>}>
                        {<UerAvatarWrap
                            variant={settingsOpen ? "sm" : "default"}
                        />}
                    </Suspense>
                    {settingsOpen && <>
                        <div className={"flex flex-col items-center justify-center gap-8 min-w-[250px]"}>
                            {user && <div className={"justify-start items-center gap-[26px] inline-flex"}>
                                <div className="text-white/90 text-base font-bold font-['Feather']">{user?.pseudo}</div>
                                <div className="w-px h-[42px] relative bg-white/10"/>
                                <div
                                    className="text-white/90 text-base font-bold font-['Feather']">{maskFirstTwo(user?.email)}</div>
                            </div>}
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
                            {user && <Button
                                variant={"textRed"}
                                onClick={() => {
                                    onSignOut()
                                }}
                            >
                                Déconnexion
                            </Button>}
                        </div>
                    </>}
                </div>
            </div>

        </>
    )
}


const LoginButton: React.FC<{ user: any, isLoading: boolean }> = ({user, isLoading}) => {

    const $router = useRouter()
    const token = localStorage ? localStorage.getItem("_token") : null

    return (
        <>
            {(!token || (!user && !isLoading)) && (
                <Button
                    variant={"green"}
                    onClick={() => $router.push("/auth/login")}
                    className={"absolute -bottom-4 w-64 "}
                >
                    Se connecter <ArrowRight className={"w-4 h-4"}/>
                </Button>
            )}
        </>
    )
}
const UerAvatarWrap: React.FC<{
    variant?: "default" | "sm"
    onClick?: () => void
}> = ({
          variant,
          onClick
      }) => {
    const [show, setShow] = React.useState(false)
    const [clickCount, setClickCount] = useState(0)
    const [lastClickTime, setLastClickTime] = useState(0)
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true)
            clearTimeout(timer)
        }, 10)
    }, []);

    // Reset click count after 3 seconds of inactivity
    useEffect(() => {
        if (clickCount > 0) {
            const timer = setTimeout(() => {
                setClickCount(0)
                setShowEasterEgg(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [clickCount])

    const handleAvatarClick = () => {
        const now = Date.now()
        
        // Reset if more than 3 seconds between clicks
        if (now - lastClickTime > 3000) {
            setClickCount(1)
        } else {
            const newCount = clickCount + 1
            setClickCount(newCount)
            
            // Easter egg triggered at 5 clicks
            if (newCount === 5) {
                setShowEasterEgg(true)
                toast.success("🎉 Easter egg découvert ! Redirection vers l'admin...", {
                    duration: 2000
                })
                
                // Navigate to admin after a short delay
                setTimeout(() => {
                    router.push('/admin/dashboard')
                }, 1500)
                
                // Reset after navigation
                setTimeout(() => {
                    setClickCount(0)
                    setShowEasterEgg(false)
                }, 2000)
            }
        }
        
        setLastClickTime(now)
    }

    const {profile: user, showFullPseudo, userAvatar, isLoading} = useProfile()
    const isSM = variant === "sm";

    return (
        <div
            className={cn(
                "size-[115px] bg-[#ffab33] rounded-full flex items-center justify-center relative cursor-pointer transition-transform",
                isSM && "size-[90px]",
                showEasterEgg && "animate-pulse"
            )}
            style={{
                background: getBgColorFromLetter(user?.pseudo),
            }}
            onClick={handleAvatarClick}
        >
            {/* Easter egg indicator */}
            {clickCount > 0 && clickCount < 5 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-lPrimary rounded-full flex items-center justify-center text-xs font-bold text-bgPrimary"
                >
                    {clickCount}
                </motion.div>
            )}

            {/* Special effect for 5th click */}
            {showEasterEgg && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-lPrimary to-lPrimary/50 rounded-full animate-ping"
                />
            )}

            <div
                className="w-[35px] h-[43px] text-[#0c1216] text-4xl font-bold font-['Feather'] flex flex-col items-center justify-center">

                {/* On utilise AnimatePresence pour animer la transition */}
                <AnimatePresence mode="wait">
                    {user ? (
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
                    ) : <div className={"size-[40px] animate-in pt-2"}>
                        <Image
                            width={90}
                            height={90}
                            src={logoutUser}
                            alt={"Logout"}
                            className={"w-auto"}
                        />
                    </div>}
                </AnimatePresence>
            </div>
            {user ? <div
                className="absolute -bottom-2 h-[29px] px-3.5 py-[5px]
           bg-gradient-to-b from-[#28144f] to-[#06030a]
           rounded-[99px] flex items-center gap-[9px] overflow-hidden
           text-white text-[15px] font-bold font-['Feather']"
            >
                <div className="w-[7px] h-[7px] bg-[#18f850] rounded-full"/>
                <div>Bonjour</div>
            </div> : <></>}
            {show ? <LoginButton
                user={user}
                isLoading={isLoading}
            /> : <></>
            }
        </div>
    );
};

// Modal de connexion requise
const LoginRequiredModal: React.FC<{
    isOpen: boolean
    onClose: () => void
    onLogin: () => void
}> = ({isOpen, onClose, onLogin}) => {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
            >
                <motion.div
                    className="bg-[#1a143a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                    initial={{opacity: 0, scale: 0.95, y: 20}}
                    animate={{opacity: 1, scale: 1, y: 0}}
                    exit={{opacity: 0, scale: 0.95, y: 20}}
                    transition={{duration: 0.2}}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div>
                                <div
                                    className="w-10 h-10 rounded-xl bg-[#5f3a9a]/20 border border-[#5f3a9a]/30 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#5f3a9a]" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold font-['Feather'] text-white">
                                    Connexion requise
                                </h2>
                                <p className="text-sm text-white/60 font-['Feather']">
                                    Accès personnalisé
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        <div className="space-y-3">
                            <p className="text-white/80 font-['Feather'] leading-relaxed">
                                Pour personnaliser vos versets et accéder à toutes les fonctionnalités, vous devez créer
                                un compte ou vous connecter.
                            </p>
                            <div className="p-4 bg-[#5f3a9a]/10 border border-[#5f3a9a]/20 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div
                                            className="w-8 h-8 rounded-lg bg-[#5f3a9a]/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-[#5f3a9a]" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white font-['Feather']">
                                            Fonctionnalités débloquées
                                        </p>
                                        <p className="text-xs text-white/60 font-['Feather']">
                                            Création de catégories, versets personnalisés, statistiques
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 p-6 border-t border-white/10">
                        <Button
                            variant="dashed"
                            onClick={onClose}
                            className="flex-1 border-white/20 text-white hover:bg-white/10"
                        >
                            Plus tard
                        </Button>
                        <Button
                            onClick={onLogin}
                            variant={"purple"}
                        >
                            Se connecter
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}