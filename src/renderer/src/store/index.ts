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

export const createEmptyNoteAtom = atom(null, async (get, set) => {
    const notes = get(notesAtom)

    if (!notes) return

    const title = `Note ${notes.length + 1}`

    if (!title) return

    const newNote: NoteInfo = {
        title,
        lastEditTime: Date.now()
    }

    set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

    set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, async (get, set) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)

    if (!selectedNote || !notes) return

    set(
        notesAtom,
        notes.filter((note) => note.title !== selectedNote.title)
    )

    set(selectedNoteIndexAtom, null)
})