"use client";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {AlertTriangle, Trash2, X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    itemName: string;
    isLoading?: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
                                                                                    isOpen,
                                                                                    onClose,
                                                                                    onConfirm,
                                                                                    title,
                                                                                    message,
                                                                                    itemName,
                                                                                    isLoading = false
                                                                                }) => {
    const [confirmationText, setConfirmationText] = useState("");
    const [isValid, setIsValid] = useState(false);

    // Réinitialiser le formulaire quand la modal s'ouvre/ferme
    useEffect(() => {
        if (isOpen) {
            setConfirmationText("");
            setIsValid(false);
        }
    }, [isOpen]);

    // Vérifier si le texte de confirmation est correct
    useEffect(() => {
        setIsValid(confirmationText.trim().toLowerCase() === "delete");
    }, [confirmationText]);

    const handleConfirm = () => {
        if (isValid && !isLoading) {
            onConfirm();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && isValid && !isLoading) {
            handleConfirm();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

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
                    className="bg-bgPrimary border border-red-500/30 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                    initial={{opacity: 0, scale: 0.95, y: 20}}
                    animate={{opacity: 1, scale: 1, y: 0}}
                    exit={{opacity: 0, scale: 0.95, y: 20}}
                    transition={{duration: 0.2}}
                >
                    {/* Header avec icône d'alerte */}
                    <div className="flex items-center justify-between p-6 border-b border-red-500/20">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-400"/>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold font-['Feather'] text-white">
                                    {title}
                                </h2>
                                <p className="text-sm text-red-400/70 font-['Feather']">
                                    Action irréversible
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            disabled={isLoading}
                            className="text-muted-foreground hover:text-white hover:bg-red-500/10"
                        >
                            <X className="w-5 h-5"/>
                        </Button>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 space-y-6">
                        {/* Message d'avertissement */}
                        <div className="space-y-3">
                            <p className="text-white font-['Feather'] leading-relaxed">
                                {message}
                            </p>
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <p className="text-sm text-red-400 font-['Feather'] font-medium">
                                    <strong>{itemName}</strong> sera définitivement supprimé.
                                </p>
                            </div>
                        </div>

                        {/* Champ de confirmation */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium font-['Feather'] text-white">
                                Tapez <span className="text-red-400 font-bold">DELETE</span> pour confirmer
                            </label>
                            <Input
                                value={confirmationText}
                                onChange={(e) => setConfirmationText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="DELETE"
                                disabled={isLoading}
                                className={`bg-bgPrimarySecondary/30 border text-white placeholder:text-muted-foreground font-['Feather'] focus:border-red-500/50 focus:ring-red-500/20 ${
                                    confirmationText && !isValid
                                        ? "border-red-500/50"
                                        : isValid
                                            ? "border-green-500/50"
                                            : "border-bgPrimarySecondary/50"
                                }`}
                                autoFocus
                            />
                            {confirmationText && !isValid && (
                                <p className="text-sm text-red-400 font-['Feather']">
                                    Le texte doit être exactement "DELETE"
                                </p>
                            )}
                            {isValid && (
                                <p className="text-sm text-green-400 font-['Feather']">
                                    ✓ Confirmation valide
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 p-6 border-t border-red-500/20 bg-bgPrimarySecondary/10">
                        <Button
                            variant="dashed"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 "
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={!isValid || isLoading}
                            variant={isValid ? "red" : "disabled"}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                    Suppression...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Trash2 className="w-4 h-4"/>
                                    Supprimer définitivement
                                </div>
                            )}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}; 