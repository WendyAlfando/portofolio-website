import { Geist, Playfair_Display } from "next/font/google"

// Both are variable fonts, so every weight comes from a single file each.
export const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
export const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const fontVariables = `${geist.variable} ${playfair.variable}`
