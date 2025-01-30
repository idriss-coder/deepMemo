"use client"
import {useEffect} from 'react';

export default function InstallButton() {

    let deferredPrompt: any;

    const showDonwloadPrompt = () => {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('L\'utilisateur a accepté l\'installation');
            } else {
                console.log('L\'utilisateur a refusé l\'installation');
            }
            deferredPrompt = null;
        });
    }

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: any) => {
            event.preventDefault();
            deferredPrompt = event;
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    return (
        <button
            onClick={showDonwloadPrompt}
            className={"text-lg text-slate-900 bg-lime-400 py-4 px-8 font-semibold cursor-pointer border-b-4 border-lime-500 hover:border-b-lime-700 leading-snug"}
        >Installer l'application</button>
    )
}