"use client"

import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function UseTermPage() {

    const $router = useRouter()

    const onAcceptUserTerm = () => {
        $router.push("/plaground/home")
    }

    return (
        <div className={"bg-gradient-to-b from-[#5f3a9a] to-[#1a143a] relative"}>
            <div>
                <Image
                    src={"/assets/skins/term-bg.png"}
                    alt={"term-bg"}
                    width={393}
                    height={336}
                    className={"w-full"}
                />
            </div>
            <div className={"absolute top-0"}>
                <div className={"h-[173px] flex items-center justify-center"}>
                    <div className="text-center text-white text-xl font-bold font-['Feather']">Condittions
                        d’utilisation
                    </div>

                </div>
                <div className={"bg-bgPrimary  pt-[26px] px-[24px] pb-[24px] rounded-[20px]"}>
                    <div className={"flex items-center justify-center"}>
                        <div className="w-[60px] h-[5px] relative bg-[#38454e] rounded-[20px]"/>
                    </div>
                    <div className={"pt-[20px] pb-[120px] text-white/80 text-base font-medium leading-relaxed"}>
                        1. Introduction
                        Bienvenue sur KuizLang (ci-après « l’Application »), une plateforme de quiz linguistiques et
                        éducatifs similaire à Duolingo. Les présentes Conditions Générales d’Utilisation (ci-après « CGU
                        »)
                        régissent votre accès à l’Application et son utilisation. Veuillez lire attentivement ces CGU
                        avant
                        de vous inscrire ou d’utiliser les services proposés. En accédant à l’Application, vous acceptez
                        d’être lié par ces CGU.

                        2. Objet
                        Les présentes CGU ont pour objet de définir les modalités d’utilisation de l’Application.
                        KuizLang
                        fournit des quiz, des leçons et divers contenus pédagogiques visant à faciliter l’apprentissage
                        des
                        langues. Ces services peuvent être amenés à évoluer.
                        3. Inscription et Compte Utilisateur
                        Création de compte : Pour accéder à toutes les fonctionnalités de l’Application, vous devrez
                        créer
                        un compte en fournissant une adresse e-mail valide et en choisissant un mot de passe. Vous vous
                        engagez à fournir des informations exactes et à les tenir à jour.
                        Sécurité du compte : Vous êtes responsable du maintien de la confidentialité de vos identifiants
                        de
                        connexion. Toute activité effectuée via votre compte est présumée être de votre fait.
                        Âge minimum : L’utilisation de l’Application est réservée aux personnes âgées d’au moins 13 ans
                        ou
                        ayant l’autorisation parentale (selon la législation en vigueur dans votre pays).
                        4. Utilisation de l’Application
                        Licence d’utilisation : Sous réserve du respect des présentes CGU, KuizLang vous accorde une
                        licence
                        personnelle, non exclusive, non transférable et révocable pour accéder à l’Application et
                        l’utiliser
                        à des fins strictement personnelles et non commerciales.
                        Restrictions d’utilisation : Vous vous interdisez notamment de :
                        Copier, modifier ou distribuer tout ou partie de l’Application et de son contenu sans
                        autorisation
                        écrite préalable.
                        Tenter d’entraver le bon fonctionnement de l’Application, notamment via l’envoi de virus, le
                        piratage ou toute autre action malveillante.
                        Utiliser l’Application à des fins illégales, diffamatoires, frauduleuses ou portant atteinte aux
                        droits de tiers.
                        Suspension de l’accès : KuizLang se réserve le droit de suspendre ou de résilier l’accès à
                        l’Application, sans préavis, en cas de violation des présentes CGU ou de comportement
                        inapproprié.
                        5. Contenu et Propriété Intellectuelle
                        Contenu KuizLang : Tous les éléments présents sur l’Application (textes, graphiques, logos,
                        sons,
                        vidéos, quiz, etc.) sont la propriété exclusive de KuizLang ou de ses concédants et sont
                        protégés
                        par la législation applicable en matière de droits d’auteur et de propriété intellectuelle.
                        Contenu Utilisateur : Les utilisateurs peuvent être amenés à soumettre du contenu (réponses,
                        commentaires, messages, etc.). Vous restez propriétaire de ce que vous publiez, mais vous
                        accordez à
                        KuizLang une licence mondiale, gratuite et non exclusive pour l’affichage et la diffusion du
                        contenu
                        dans le cadre des fonctionnalités de l’Application.
                        Signalement d’un contenu illicite : Pour signaler un contenu litigieux, veuillez contacter notre
                        service client à l’adresse indiquée dans l’Application.
                        6. Modalités Financières
                        Application gratuite et offres payantes : L’Application propose une version gratuite comprenant
                        des
                        quiz et des fonctionnalités de base. Des abonnements payants ou des achats in-app (par exemple,
                        accès à des quiz premium, suppression de publicités) peuvent être proposés.
                        Conditions de paiement : Tout paiement doit être effectué via les plateformes prévues (App
                        Store,
                        Google Play, etc.). Les tarifs et modalités de facturation sont indiqués au moment de la
                        souscription.
                        Remboursements : Les politiques de remboursement dépendent des conditions imposées par la
                        plateforme
                        de distribution (App Store, Google Play) ou, le cas échéant, par la législation applicable.
                        7. Protection de la Vie Privée
                        Votre utilisation de l’Application est soumise à notre [Politique de Confidentialité], qui
                        décrit la
                        manière dont nous collectons, utilisons et protégeons vos données personnelles. En utilisant
                        l’Application, vous acceptez la collecte et l’utilisation de vos informations conformément à
                        cette
                        Politique.
                        8. Limitation de Responsabilité
                        Disponibilité de l’Application : KuizLang met en œuvre tous les moyens raisonnables pour assurer
                        la
                        disponibilité de l’Application, mais ne garantit pas l’absence d’interruptions ou d’erreurs.
                        Exclusion de garantie : L’Application est fournie « en l’état ». Dans la mesure permise par la
                        loi,
                        KuizLang exclut toute garantie explicite ou implicite, y compris les garanties de qualité
                        marchande,
                        d’adaptation à un usage particulier ou de non-contrefaçon.
                        Responsabilité limitée : Dans la mesure permise par la loi, KuizLang ne pourra être tenu
                        responsable
                        des dommages directs ou indirects résultant de l’utilisation ou de l’impossibilité d’utiliser
                        l’Application.
                    </div>
                </div>
            </div>
            <div
                className={"h-[200px] p-[20px] flex flex-col gap-2 items-center justify-end bg-gradient-to-b from-[#141f25]/0 via-[#141f25] to-[#141f25] fixed bottom-0 w-full"}>
                <Button onClick={onAcceptUserTerm} variant={"default"} className={"w-full"}>Accepter</Button>
                <Link href={"/login"}>
                    <Button variant={"textRed"} className={"w-full"}>Refuser</Button>
                </Link>
            </div>
        </div>
    )
}