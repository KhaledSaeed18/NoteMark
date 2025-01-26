import { atom } from "jotai";
import { notesMock } from "./mocks";
import { NoteInfo } from "@shared/models";

export const notesAtom = atom<NoteInfo[]>(notesMock)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
    const selectedNoteIndex = get(selectedNoteIndexAtom)
    const notes = get(notesAtom)

    if (selectedNoteIndex == null) return null

    const selectedNote = notes[selectedNoteIndex]

    return {
        ...selectedNote,
        content: `# Hello from ${selectedNoteIndex}`
    }
})