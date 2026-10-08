import type { Locale } from "@/lib/i18n"
import type { Dictionary } from "./types"
import { en } from "./dictionaries/en"
import { id } from "./dictionaries/id"

const dictionaries: Record<Locale, Dictionary> = { id, en }

export function getDictionary(lang: Locale): Dictionary {
    return dictionaries[lang]
}
