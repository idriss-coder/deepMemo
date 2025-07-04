"use client"

import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import type {Verset} from "@/lib/db";

export enum Difficult {
  CLASSIC = "CLASSIC",
  HARD = "HARD"
}

export enum SoundList {
  gameStarted = "/assets/sound/start/start.mp3",
  gameEnded = "/assets/sound/partyEnded.mp3",
  gameLoosed = "/assets/sound/loose/game-over.mp3",
  gameWinned = "/assets/sound/partyWinned.mp3",

  sellectWin1 = "/assets/sound/win/win1.mp3",
  sellectWin2 = "/assets/sound/win/win2.mp3",
  sellectWin3 = "/assets/sound/win/win3.mp3",

  theme1 = "/assets/sound/theme/theme1.mp3",
  theme2 = "/assets/sound/theme/theme2.mp3",


  thunder = "/assets/sound/lottie/thunder.mp3",
  flash = "/assets/sound/lottie/flash.mp3",
  star = "/assets/sound/lottie/star.mp3",
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeAccents(str: string) {
  return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
}

export function normalizeVersetTitle(verset: Verset) {
  return `${verset.chapter_num ? verset.chapter_num + "" : ""} ${
      verset.verses_num ? ": " + verset.verses_num[0] + (verset.verses_num.length > 1 ? "-" + verset.verses_num[verset.verses_num.length - 1] : "") : ""
  } `
}

export const missedAnswerMessages = [
  "La bonne réponse, c'était celle-ci",
  "C'est celle-ci qu'il fallait sélectionner",
  "Et voilà la solution correcte que tu as manquée",
  "Le bon choix était en fait celui-là",
  "La réponse exacte était la suivante",
  "C'est cette solution qu'il fallait prendre",
  "Dommage, c'était celle-là la bonne",
  "C'est ici qu'était la bonne option",
  "C'est cette réponse qui était juste",
  "La bonne réponse, la voici !",
  "C'est précisément elle qu'il fallait choisir",
  "Ce choix était le bon",
  "Ça se jouait sur celui-ci",
  "Regarde, c'était cette solution la bonne",
  "C'est elle, la réponse correcte",
  "La solution attendue se trouvait ici",
  "Cette option était la bonne",
  "C'est cette réponse qu'on attendait",
  "On visait exactement celle-ci",
  "Voilà, tu aurais dû cocher ça"
];



const encouragements = [
  "Bravo ! Tu gères ça comme un pro.",
  "Superbe ! Continue sur ta lancée.",
  "Excellente réponse !",
  "Magnifique coup d'œil !",
  "Bien joué, champion !",
  "C'est ça, ne lâche rien !",
  "Génial, tu maîtrises le sujet.",
  "Wouah, tu es imbattable !",
  "Félicitations, tu as vu juste.",
  "Parfait, comme toujours !",
  "Super, ta logique est implacable.",
  "Excellent, tu es sur la bonne voie.",
  "Bingo, tu ne t'es pas trompé !",
  "Yes, c'est carton plein !",
  "Formidable ! On voit l'expertise.",
  "Impressionnant, tu fais ça les yeux fermés.",
  "C'est exact, tu es en feu !",
  "Fantastique ! Tu as tout compris.",
  "Boom, un sans-faute !",
  "Incroyable, on sent la progression.",
  "Chapeau, rien ne t'arrête !",
  "Tu gères ça d'une main de maître.",
  "Coup de génie, bravo !",
  "Inarrêtable ! Tu es vraiment au top.",
  "Tu vises juste à chaque fois.",
  "Nickel, la précision est au rendez-vous.",
  "Super réponse, continue ainsi.",
  "Remarquable ! Tu gagnes en confiance.",
  "Touché en plein dans le mille !",
  "Belle réflexion, félicitations.",
  "Grosse performance !",
  "Yes, tu as trouvé la bonne solution.",
  "Tu as du talent, clairement.",
  "Parfait, c'est du propre.",
  "Encore une bonne réponse, la classe !",
  "Excellent reasoning, keep it up!",
  "Bravo, tu es sur une série gagnante !",
  "C'est tout bon : rien à redire.",
  "Wow, tu ne fais pas semblant !",
  "Tu vas terminer ce quiz en beauté !"
];

export function getRandomEncouragement(): string {
  const randomIndex = Math.floor(Math.random() * encouragements.length);
  return encouragements[randomIndex];
}

const errorMessages = [
  "Oups, ce n'est pas ça.",
  "Mauvaise pioche, essaie encore !",
  "Aïe… ce n'était pas la bonne.",
  "Pas tout à fait… on se rapproche ?",
  "Ce n'est pas correct, courage !",
  "Raté ! Ne lâche pas.",
  "Dommage, ce n'est pas la bonne réponse.",
  "Eh non, réessaie !",
  "Pas grâve, mais tu peux y arriver.",
  "Hélas, ce n'est pas la réponse attendue.",
  "Mauvais choix, mais rien n'est perdu.",
  "Zut, un petit faux pas.",
  "Ce n'est pas juste, concentre-toi !",
  "Arf, essaye à nouveau.",
  "C'est faux, mais on apprend de ses erreurs.",
  "Pas la bonne… un nouvel essai ?",
  "Hum, tu t'es trompé, persévère !",
  "Perdu ! On remet ça ?",
  "Oups, il va falloir réviser un peu.",
  "Ce n'était pas la bonne option, garde le cap.",
  "Mince, encore un effort.",
  "Réponse incorrecte, tu feras mieux la prochaine fois.",
  "Désolé, ce n'est pas ce qu'on cherchait.",
  "Patience, ce n'est pas encore ça.",
  "Faux, mais l'important c'est de progresser.",
  "Essaye une autre réponse, tu y es presque.",
  "Malheureusement… ce n'est pas correct.",
  "Pas de panique, continue d'essayer.",
  "Ça ne colle pas, revois ta stratégie !",
  "Tu viens de manquer, mais tu peux retenter."
];

export function getRandomErrorMessage(): string {
  const randomIndex = Math.floor(Math.random() * errorMessages.length);
  return errorMessages[randomIndex];
}

export function pickRandom<T>(d: T[]): T {
  const randomIndex = Math.floor(Math.random() * d.length);
  return d[randomIndex]

}

export function shuffleArray<T>(arr: T[]): T[] {
  const newArr = [...arr]; // Copie pour éviter de modifier l'original
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

let activeAudios: HTMLAudioElement[] = [];

/** Arrête tous les sons stockés */
export function stopAllSounds() {
  activeAudios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0; // facultatif : remet à zéro
  });
  activeAudios = [];
}

export const playSound = ({path, replay = false, sound = 0.2}: { path: string, replay?: boolean, sound?: number }) => {

  if (sound < 0.1) return

  const audio = new Audio(path);
  audio.volume = sound
  audio.loop = replay
  audio.play().catch((err) => {
    // On peut gérer une erreur silencieuse, ou logguer si nécessaire
    console.error("Erreur lors de la lecture du son:", err);
  });
  activeAudios.push(audio);
}

export function validateEmail(email: string) {
  // Expression régulière pour un email "classique"
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

export const isOnline = () => {
  return navigator.onLine;
};


export function maskFirstTwo(input?: string): string {
  if (!input) return "";
  if (input.length <= 2) {
    return input;
  }

  const visiblePart = input.slice(0, 2);

  const hiddenPart = "*".repeat(input.length - 2);

  return visiblePart + hiddenPart;
}

export function removeNumberAtStart(text: string): string {
  // On utilise ici une expression régulière :
  // ^\d+\s* signifie :
  //  - ^ : début de la chaîne
  //  - \d+ : un ou plusieurs chiffres
  //  - \s* : zéro ou plusieurs espaces
  return text.replace(/^\d+\s*/, '');
}

export function startsWithNumber(text: string): boolean {
  // On utilise une expression régulière pour tester la présence d'un nombre au début
  // ^ : début de la chaîne
  // \d+ : un ou plusieurs chiffres
  return /^\d+/.test(text);
}