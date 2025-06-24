import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {validateEmail} from "@/lib/utils";
import {IUser, LoginResponse, RegisterResponse} from "@/models/UserModel";
import UserService from "@/service/UserService";
import {AuthManagerGuard} from "@/service/AuthManager";
import {db, LocalUser} from "@/lib/db";
import {useVerses} from "@/hooks/useVerses";
import VersetService from "@/service/VersetServie";


const userService = new UserService()
const versetService = new VersetService()

export const useRegister = () => {
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [waiting, setWaiting] = useState(false);
    const {verses: myVerses} = useVerses()

    const $router = useRouter()


    // Fonction de vérification basique
    const validateForm = () => {
        let isValid = true;

        // Validation email
        if (!email) {
            toast.error("L'email est requis.");
            isValid = false;
        } else if (!validateEmail(email)) {
            toast.error("Format d'email invalide.");
            isValid = false;
        }

        // Validation pseudo
        if (!pseudo) {
            toast.error("Le pseudo est requis.");
            isValid = false;
        } else if (pseudo.length < 3) {
            toast.error("Le pseudo doit contenir au moins 3 caractères.");
            isValid = false;
        }

        // Validation mot de passe
        if (!password) {
            toast.error("Le mot de passe est requis.");
            isValid = false;
        }

        return isValid;
    };

    const handlerRegister = async () => {
        // On lance la validation
        if (!validateForm()) {
            return;
        }

        const toastID = toast.loading("Création du compte en cours...");
        try {
            setWaiting(true)
            const _user: Partial<IUser> = {
                email,
                pseudo,
                password
            }
            const result: RegisterResponse = await userService.register(_user);
            if (result) {
                toast.success(result.message);
                AuthManagerGuard.loginToApp(result.user.token)

                //*******************************************
                const hasNotSynced = myVerses?.find(v => {
                    return (v.user_id == undefined)
                })

                if (hasNotSynced && myVerses) {

                    const toastId = toast.loading("Un instant...");

                    for (const v of myVerses) {
                        await versetService.addVersetToBulk({...v, user_id: result.user.id})
                    }

                    await db.verses.clear()

                    await versetService.syncWithServer();

                    toast.dismiss(toastId);
                }
                //*******************************************

                const timer = setTimeout(() => {
                    clearTimeout(timer)
                    toast.dismiss(toastID)
                }, 3000)

                setWaiting(false)
                $router.replace("/plaground/use-term")
            }
            toast.dismiss(toastID);
        } catch (err: any) {
            setWaiting(false)
            toast.dismiss(toastID)
            // Gérer l'erreur côté service (ex: email déjà utilisé, etc.)
            toast.error(err.message || "Erreur lors de l'inscription");
        }
    };


    return {
        email, setEmail,
        pseudo, setPseudo,
        password, setPassword,
        waiting,
        handlerRegister,

    }
}

export const useLogin = () => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [waiting, setWaiting] = useState(false);

    const $router = useRouter()


    const handlerLogin = async () => {
        if (!email) {
            toast.error("L'email est requis.");
            return
        }

        if (!password) {
            toast.error("Le mot de passe est requis.");
            return
        }

        setWaiting(true);
        const loadingID = toast.loading("Connexion en cours...");

        const result = <LoginResponse>await userService.login({email, password})

        if (!result.success) {
            toast.error(result.message || "Erreur lors de l'authentification.")
            toast.dismiss(loadingID);
            setWaiting(false);
            return
        }

        if (result.success && result.token) {
            AuthManagerGuard.loginToApp(result.token)

            $router.replace("/plaground/home")
            toast.success("Connexion reussie ✅")
        }

        toast.dismiss(loadingID);
        setWaiting(false);
    }

    return {
        email, setEmail,
        password, setPassword,
        waiting,
        handlerLogin
    }
}

export const useGetProfile = () => {

    const [profile, setLocaleProfile] = useState<LocalUser>()

    useEffect(() => {
        const fetchUser = async () => {
            const data = await db.profile.toArray();
            if (data.length) {
                setLocaleProfile(data[0]);
            }
        };
        void fetchUser();
    }, []);

    return {
        profile
    }
}

export const useGetLocalUser = () => {
    const [user, setUser] = useState<LocalUser | undefined>();
    const [showFullPseudo, setShowFullPseudo] = useState(true);
    const [hasRefetched, setHasRefetched] = useState(false);

    // Fonction de récupération de l'utilisateur
    const fetchUser = async () => {
        try {
            const data = await db.profile.toArray();
            if (data.length > 0) {
                setUser(data[0]);
            }
        } catch (error) {
            // Gérer l'erreur si nécessaire
            console.error("Erreur lors du fetch user:", error);
        }
    };

    // Premier fetch au montage
    useEffect(() => {
        void fetchUser();
    }, []);

    // Refetch si l'utilisateur n'est pas trouvé, après un délai
    useEffect(() => {
        if (!user && !hasRefetched) {
            const refetchTimer = setTimeout(() => {
                void fetchUser();
                setHasRefetched(true);
            }, 3000); // 3 secondes – ajustez si nécessaire

            return () => clearTimeout(refetchTimer);
        }
    }, [user, hasRefetched]);

    // Masque le pseudo complet après 3 secondes une fois que l'utilisateur est défini
    useEffect(() => {
        if (!user) return;
        const timer = setTimeout(() => {
            setShowFullPseudo(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [user]);

    // Calcul du diminutif de pseudo (ex : "Jo" si pseudo = "John")
    const userAvatar = useMemo(() => {
        if (!user) return "";
        if (user.pseudo.length < 2) return user.pseudo;
        return user.pseudo.slice(0, 2);
    }, [user]);

    return {
        user,
        userAvatar,
        showFullPseudo
    };
};

export const useSignOut = () => {
    const handlerSignOut = async () => {
        AuthManagerGuard.logoutToApp()
        db.profile.clear()
    }
    return {
        handlerSignOut
    }
}