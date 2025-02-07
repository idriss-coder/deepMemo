import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Verset} from "@/lib/db";

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

