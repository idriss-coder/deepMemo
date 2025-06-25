"use client";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {CategoryCardProps} from "../_types";
import {VersetCreator} from "./VersetCreator";
import {DeleteConfirmationModal} from "./DeleteConfirmationModal";
import {
    BookOpen,
    ChevronDown,
    ChevronRight,
    Edit,
    Hash,
    MoreVertical,
    Plus,
    Power,
    PowerOff,
    Trash2
} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {normalizeVersetTitle} from "@/lib/utils";
import {bookMapById} from "@/backend/mock/bible-book";
import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useCategories} from "../_hooks/useCategories";

export const CategoryCard: React.FC<CategoryCardProps> = ({
                                                              category,
                                                              onUpdate,
                                                              onDelete,
                                                              onToggleActive,
                                                              onAddVerset,
                                                              onRemoveVerset
                                                          }) => {
    const [editingCategory, setEditingCategory] = useState(false);
    const [editName, setEditName] = useState(category.name);
    const [showVersetCreator, setShowVersetCreator] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Récupérer les états de chargement depuis le hook
    const {
        isUpdating,
        isDeleting,
        isCreatingVerset,
        isRemovingVerset,
        isToggling
    } = useCategories({includeDisabled: true});

    // Fermer le dropdown quand on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const startEditing = () => {
        setEditingCategory(true);
        setEditName(category.name);
        setShowDropdown(false);
    };

    const cancelEditing = () => {
        setEditingCategory(false);
        setEditName(category.name);
    };

    const saveEditing = async () => {
        try {
            await onUpdate(category._id, editName);
            setEditingCategory(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            saveEditing();
        } else if (e.key === 'Escape') {
            cancelEditing();
        }
    };

    const handleVersetCreated = async (versetData: {
        book_num: number;
        chapter_num: number;
        verses_num: number[];
        content: string;
    }) => {
        try {
            await onAddVerset(category._id, versetData);
            setShowVersetCreator(false);
        } catch (error) {
            console.error("Erreur lors de la création du verset:", error);
        }
    };

    const handleDelete = async () => {
        setShowDropdown(false);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await onDelete(category._id);
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    };

    const handleToggleActive = async () => {
        try {
            await onToggleActive(category._id, !category.isActive);
        } catch (error) {
            console.error("Erreur lors du changement d'état:", error);
        }
    };

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const versetCount = category?.versets?.length || 0;

    return (
        <>
            <motion.div
                className={`bg-bgPrimarySecondary/10 border rounded-2xl backdrop-blur-sm transition-all duration-300 group ${
                    category.isActive
                        ? "border-bgPrimarySecondary/30 hover:border-lPrimary/40 hover:bg-bgPrimarySecondary/20"
                        : "border-red-500/30 bg-red-500/5 opacity-60"
                }`}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3}}
            >
                {/* Category Header */}
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            {/* Expand/Collapse Button */}
                            <button
                                onClick={toggleExpansion}
                                //disabled={!category.isActive}
                                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lPrimary/50 ${
                                    category.isActive
                                        ? "bg-bgPrimarySecondary/30 hover:bg-bgPrimarySecondary/50 group-hover:bg-lPrimary/20"
                                        : "bg-red-500/20"
                                }`}
                                aria-label={isExpanded ? "Réduire les versets" : "Afficher les versets"}
                            >
                                <AnimatePresence mode="wait">
                                    {isExpanded ? (
                                        <motion.div
                                            key="down"
                                            initial={{rotate: -90}}
                                            animate={{rotate: 0}}
                                            exit={{rotate: 90}}
                                            transition={{duration: 0.2}}
                                        >
                                            <ChevronDown
                                                className={`w-4 h-4 ${category.isActive ? "text-muted-foreground" : "text-red-400"}`}/>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="right"
                                            initial={{rotate: 90}}
                                            animate={{rotate: 0}}
                                            exit={{rotate: -90}}
                                            transition={{duration: 0.2}}
                                        >
                                            <ChevronRight
                                                className={`w-4 h-4 ${category.isActive ? "text-muted-foreground" : "text-red-400"}`}/>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            {/* Category Icon & Name */}
                            <div className="flex items-center gap-3 flex-1">
                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                                    category.isActive
                                        ? "bg-gradient-to-br from-lPrimary/20 to-lPrimary/10 border-lPrimary/30"
                                        : "bg-gradient-to-br from-red-500/20 to-red-500/10 border-red-500/30"
                                }`}>
                                    <BookOpen
                                        className={`w-5 h-5 ${category.isActive ? "text-lPrimary" : "text-red-400"}`}/>
                                </div>

                                {editingCategory ? (
                                    <div className="flex items-center gap-2 flex-1">
                                        <Input
                                            className="bg-bgPrimarySecondary/50 border-bgPrimarySecondary/50 text-white font-['Feather'] font-bold text-lg focus:border-lPrimary/50"
                                            value={editName}
                                            onChange={e => setEditName(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            autoFocus
                                            disabled={isUpdating}
                                        />
                                        <Button
                                            size="sm"
                                            onClick={saveEditing}
                                            disabled={isUpdating}
                                            className="bg-[#92d233] hover:bg-[#92d233]/80 text-white"
                                        >
                                            {isUpdating ? (
                                                <div
                                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                            ) : (
                                                "✓"
                                            )}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={cancelEditing}
                                            disabled={isUpdating}
                                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className={`text-xl font-bold font-['Feather'] transition-colors duration-200 ${
                                                category.isActive
                                                    ? "text-white group-hover:text-lPrimary"
                                                    : "text-red-400"
                                            }`}>
                                                {category.name}
                                            </h3>
                                            {!category.isActive && (
                                                <span
                                                    className="px-2 py-1 text-xs font-bold text-red-400 bg-red-500/20 border border-red-500/30 rounded-md">
                                                    DÉSACTIVÉE
                                                </span>
                                            )}
                                        </div>
                                        <p className={`text-sm font-['Feather'] ${
                                            category.isActive ? "text-muted-foreground" : "text-red-400/70"
                                        }`}>
                                            {versetCount} verset{versetCount !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Toggle Active Button */}
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleToggleActive}
                            disabled={isToggling}
                            className={`w-8 h-8 p-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lPrimary/50 ${
                                category.isActive
                                    ? "hover:bg-green-500/20 text-green-400"
                                    : "hover:bg-red-500/20 text-red-400"
                            }`}
                        >
                            {isToggling ? (
                                <div
                                    className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"/>
                            ) : category.isActive ? (
                                <Power className="w-4 h-4"/>
                            ) : (
                                <PowerOff className="w-4 h-4"/>
                            )}
                        </Button>

                        {/* Actions Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    disabled={isDeleting}
                                    className="w-8 h-8 p-0 hover:bg-bgPrimarySecondary/50 focus:outline-none focus:ring-2 focus:ring-lPrimary/50"
                                >
                                    {isDeleting ? (
                                        <div
                                            className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin"/>
                                    ) : (
                                        <MoreVertical className="w-4 h-4 text-muted-foreground"/>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                                align="end"
                                className=""
                            >
                                <DropdownMenuItem
                                    onClick={startEditing}
                                    disabled={isUpdating}
                                    className=""
                                >
                                    <Edit className="w-4 h-4"/>
                                    Modifier
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-bgPrimarySecondary/60"/>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setShowVersetCreator(true);
                                    }}
                                    disabled={isCreatingVerset}
                                    className=""
                                >
                                    <Plus className="w-4 h-4"/>
                                    Ajouter un verset
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-bgPrimarySecondary/60"/>
                                <DropdownMenuItem
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className=""
                                >
                                    <Trash2 className="w-4 h-4"/>
                                    {isDeleting ? "Suppression..." : "Supprimer"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    </div>
               

                {/* Expandable Versets Section */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{height: 0, opacity: 0}}
                            animate={{height: "auto", opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            className="overflow-hidden border-t border-bgPrimarySecondary/20"
                        >
                            <div className="p-6 pt-0">
                                {versetCount === 0 ? (
                                    <EmptyVersetsMessage onAddVerset={() => setShowVersetCreator(true)}/>
                                ) : (
                                    <VersetsList
                                        versets={category.versets || []}
                                        onRemoveVerset={(versetId) => onRemoveVerset(category._id, versetId)}
                                        isRemoving={isRemovingVerset}
                                    />
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Supprimer la catégorie"
                message={`Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ? Cette action est irréversible et supprimera également tous les versets associés à cette catégorie.`}
                itemName={category.name}
                isLoading={isDeleting}
            />

            {/* Verset Creator Modal */}
            <VersetCreator
                isOpen={showVersetCreator}
                onClose={() => setShowVersetCreator(false)}
                onVersetCreated={handleVersetCreated}
                isCreating={isCreatingVerset}
            />
        </>
    );
};

// Empty State Component
const EmptyVersetsMessage: React.FC<{ onAddVerset: () => void }> = ({onAddVerset}) => (
    <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-bgPrimarySecondary/30 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground"/>
        </div>
        <h4 className="text-lg font-bold font-['Feather'] text-white mb-2">
            Aucun verset dans cette catégorie
        </h4>
        <p className="text-sm text-muted-foreground font-['Feather'] mb-6 max-w-sm mx-auto">
            Commencez par ajouter votre premier verset pour enrichir cette catégorie
        </p>
        <Button
            onClick={onAddVerset}
            className="bg-lPrimary hover:bg-lPrimary/80 text-white font-['Feather'] font-medium"
        >
            <Plus className="w-4 h-4 mr-2"/>
            Créer un verset
        </Button>
    </div>
);

// Versets List Component
const VersetsList: React.FC<{
    versets: any[];
    onRemoveVerset: (versetId: string) => void;
    isRemoving?: boolean;
}> = ({versets, onRemoveVerset, isRemoving}) => (
    <div className="space-y-3">
        <div className="flex items-center gap-2 mb-4">
            <Hash className="w-4 h-4 text-lPrimary"/>
            <h4 className="font-['Feather'] font-bold text-white">
                Versets ({versets.length})
            </h4>
        </div>

        <div>
            <div className="space-y-2 pr-4">
                {versets.reverse().map((verset) => (
                    <motion.div
                        key={verset._id}
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        className="group flex items-center justify-between p-4 bg-bgPrimarySecondary/20 rounded-xl border border-bgPrimarySecondary/30 hover:border-lPrimary/30 hover:bg-bgPrimarySecondary/30 transition-all duration-200"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-['Feather'] text-white/90 line-clamp-2 leading-relaxed">
                                {verset.content || "Contenu non disponible"}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground font-['Feather']">
                                    {bookMapById.get(verset.book_num)?.label} {normalizeVersetTitle(verset)}
                                </span>
                                {verset.verses_num && verset.verses_num.length > 0 && (
                                    <span className="text-xs text-lPrimary font-['Feather'] font-medium">
                                        V. {verset.verses_num.join(', ')}
                                    </span>
                                )}
                            </div>
                        </div>

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onRemoveVerset(verset._id)}
                            disabled={isRemoving}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            {isRemoving ? (
                                <div
                                    className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"/>
                            ) : (
                                <Trash2 className="w-4 h-4"/>
                            )}
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
); 