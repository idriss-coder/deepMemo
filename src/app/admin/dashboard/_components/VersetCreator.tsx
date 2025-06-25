"use client";
import React, {useState, useMemo} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {BibleBook} from "@/backend/mock/bible-book";
import {SearchBookComponent, BookSelectSection} from "@/app/plaground/home/verses-list/new/_sections/book-select-section";
import {ListGrid} from "@/app/plaground/home/verses-list/new/infos/_components/list-grid-component";
import {AnimatePresence, motion} from "framer-motion";
import {X, BookOpen, Hash, FileText, Check, ArrowRight} from "lucide-react";

interface VersetCreatorProps {
    isOpen: boolean;
    onClose: () => void;
    onVersetCreated: (versetData: {
        book_num: number;
        chapter_num: number;
        verses_num: number[];
        content: string;
    }) => Promise<void>;
    isCreating?: boolean;
}

type CreationStep = "book" | "chapter" | "versets" | "content";

export const VersetCreator: React.FC<VersetCreatorProps> = ({
    isOpen,
    onClose,
    onVersetCreated,
    isCreating = false
}) => {
    const [currentStep, setCurrentStep] = useState<CreationStep>("book");
    const [selectedBook, setSelectedBook] = useState<number | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
    const [selectedVersets, setSelectedVersets] = useState<number[]>([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const isLoading = isCreating || loading;

    const book = useMemo(() => {
        if (!selectedBook) return null;
        return BibleBook.find(b => b.id === selectedBook);
    }, [selectedBook]);

    const chapterVerses = useMemo(() => {
        if (!book || !selectedChapter) return 0;
        return book.chaptersVerses.find(cv => cv.chapter === selectedChapter)?.verses || 0;
    }, [book, selectedChapter]);

    const versetTitle = useMemo(() => {
        if (!book) return "";
        return `${book.label} ${selectedChapter ? selectedChapter + "" : ""} ${
            selectedVersets.length ? ":" + selectedVersets[0] + (selectedVersets.length > 1 ? "-" + selectedVersets[selectedVersets.length - 1] : "") : ""
        }`;
    }, [book, selectedChapter, selectedVersets]);

    const handleBookSelection = (bookId: number) => {
        setSelectedBook(bookId);
        setCurrentStep("chapter");
    };

    const handleChapterSelection = (chapters: number[]) => {
        if (chapters.length > 0) {
            setSelectedChapter(chapters[0]);
            setCurrentStep("versets");
        }
    };

    const handleVersetsSelection = (versets: number[]) => {
        setSelectedVersets(versets);
    };

    const handleContentSubmit = async () => {
        if (!selectedBook || !selectedChapter || selectedVersets.length === 0 || !content.trim()) {
            return;
        }

        setLoading(true);
        try {
            await onVersetCreated({
                book_num: selectedBook,
                chapter_num: selectedChapter,
                verses_num: selectedVersets,
                content: content.trim()
            });
            
            // Reset form
            setSelectedBook(null);
            setSelectedChapter(null);
            setSelectedVersets([]);
            setContent("");
            setCurrentStep("book");
            onClose();
        } catch (error) {
            console.error("Erreur lors de la création du verset:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSelectedBook(null);
        setSelectedChapter(null);
        setSelectedVersets([]);
        setContent("");
        setCurrentStep("book");
        setSearchTerm("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const steps = [
        { id: "book", label: "Livre", icon: BookOpen, completed: !!selectedBook },
        { id: "chapter", label: "Chapitre", icon: Hash, completed: !!selectedChapter },
        { id: "versets", label: "Versets", icon: FileText, completed: selectedVersets.length > 0 },
        { id: "content", label: "Contenu", icon: Check, completed: !!content.trim() }
    ];

    const fadeInUp = {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -20},
        transition: {duration: 0.3},
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
                className="bg-bgPrimary border border-bgPrimarySecondary/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.95}}
                transition={{duration: 0.2}}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-bgPrimarySecondary/30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-lPrimary/20 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-lPrimary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold font-['Feather'] text-white">
                                Créer un verset
                            </h2>
                            <p className="text-sm text-muted-foreground font-['Feather']">
                                {versetTitle || "Sélectionnez un livre pour commencer"}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="text"
                        size="sm"
                        onClick={handleClose}
                        className="text-muted-foreground hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Progress Steps */}
                <div className="px-6 py-4 bg-bgPrimarySecondary/20">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                                    currentStep === step.id 
                                        ? "bg-lPrimary/20 text-lPrimary" 
                                        : step.completed 
                                            ? "bg-[#92d233]/20 text-[#92d233]" 
                                            : "text-muted-foreground"
                                }`}>
                                    <step.icon className="w-4 h-4" />
                                    <span className="text-sm font-['Feather'] font-medium hidden sm:block">
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-8 h-0.5 mx-2 ${
                                        step.completed ? "bg-[#92d233]" : "bg-bgPrimarySecondary/50"
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <AnimatePresence mode="wait">
                        {currentStep === "book" && (
                            <motion.div key="book" {...fadeInUp} className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-lg font-bold font-['Feather'] text-white mb-2">
                                        Sélectionnez un livre
                                    </h3>
                                    <p className="text-muted-foreground font-['Feather']">
                                        Choisissez le livre de la Bible dans lequel se trouve votre verset
                                    </p>
                                </div>
                                <SearchBookComponent
                                    tem={searchTerm}
                                    setTem={setSearchTerm}
                                />
                                <BookSelectSection
                                    searchValue={searchTerm}
                                    cb={handleBookSelection}
                                />
                            </motion.div>
                        )}

                        {currentStep === "chapter" && book && (
                            <motion.div key="chapter" {...fadeInUp} className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-lg font-bold font-['Feather'] text-white mb-2">
                                        Sélectionnez un chapitre
                                    </h3>
                                    <p className="text-muted-foreground font-['Feather']">
                                        {book.label} contient {book.chapters} chapitres
                                    </p>
                                </div>
                                <ListGrid
                                    onSelect={handleChapterSelection}
                                    listTitle=""
                                    listCount={book.chapters}
                                    selectType="unique"
                                />
                            </motion.div>
                        )}

                        {currentStep === "versets" && book && selectedChapter && (
                            <motion.div key="versets" {...fadeInUp} className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-lg font-bold font-['Feather'] text-white mb-2">
                                        Sélectionnez les versets
                                    </h3>
                                    <p className="text-muted-foreground font-['Feather']">
                                        {book.label} {selectedChapter} contient {chapterVerses} versets
                                    </p>
                                    <p className="text-sm text-muted-foreground font-['Feather'] mt-2">
                                        Cliquez sur un verset pour le sélectionner, ou faites glisser pour sélectionner plusieurs
                                    </p>
                                </div>

                                {/* Versets Grid */}
                                <ListGrid
                                    onSelect={handleVersetsSelection}
                                    listTitle=""
                                    listCount={chapterVerses}
                                    selectType="range"
                                />

                                {/* Selected Versets Display */}
                                {selectedVersets.length > 0 && (
                                    <motion.div 
                                        className="text-center p-4 bg-bgPrimarySecondary/20 rounded-lg border border-bgPrimarySecondary/30"
                                        initial={{opacity: 0, y: 10}}
                                        animate={{opacity: 1, y: 0}}
                                    >
                                        <p className="text-sm text-muted-foreground font-['Feather'] mb-2">
                                            Versets sélectionnés :
                                        </p>
                                        <p className="text-lg font-bold font-['Feather'] text-lPrimary">
                                            {selectedVersets.length === 1 
                                                ? `Verset ${selectedVersets[0]}`
                                                : `Versets ${selectedVersets[0]} à ${selectedVersets[selectedVersets.length - 1]} (${selectedVersets.length} versets)`
                                            }
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {currentStep === "content" && (
                            <motion.div key="content" {...fadeInUp} className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-lg font-bold font-['Feather'] text-white mb-2">
                                        Contenu du verset
                                    </h3>
                                    <p className="text-muted-foreground font-['Feather']">
                                        {versetTitle}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <Textarea
                                        placeholder="Saisissez le contenu du verset..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="min-h-[200px] bg-bgPrimarySecondary/50 border-bgPrimarySecondary/50 text-white placeholder:text-muted-foreground font-['Feather'] resize-none"
                                        autoFocus
                                    />
                                    <p className="text-sm text-muted-foreground font-['Feather'] text-center">
                                        Vous n'êtes pas obligé d'inclure tout le verset : un simple aperçu suffit.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-bgPrimarySecondary/30 bg-bgPrimarySecondary/10">
                    <div className="flex items-center justify-between gap-4">
                        <Button
                            variant="textRed"
                            onClick={handleClose}
                            className="font-['Feather']"
                        >
                            Annuler
                        </Button>
                        
                        <div className="flex items-center gap-3">
                            {currentStep !== "book" && (
                                <Button
                                    variant="dashed"
                                    onClick={() => {
                                        if (currentStep === "content") setCurrentStep("versets");
                                        else if (currentStep === "versets") setCurrentStep("chapter");
                                        else if (currentStep === "chapter") setCurrentStep("book");
                                    }}
                                    className="font-['Feather']"
                                >
                                    Retour
                                </Button>
                            )}
                            
                            {currentStep === "versets" && selectedVersets.length > 0 && (
                                <Button
                                    onClick={() => setCurrentStep("content")}
                                    className="font-['Feather'] font-bold"
                                >
                                    Continuer
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                            
                            {currentStep === "content" && (
                                <Button
                                    onClick={handleContentSubmit}
                                    disabled={isLoading || !content.trim()}
                                    className="font-['Feather'] font-bold"
                                >
                                    {isLoading ? "Création..." : "Créer le verset"}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}; 