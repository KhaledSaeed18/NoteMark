import { appDirectoryName, fileEncoding } from "@shared/constants"
import { NoteInfo } from "@shared/models"
import { GetNotes } from "@shared/types"
import { ensureDir, readdir, stat } from "fs-extra"
import { homedir } from "os"

// get the root directory of the app
export const getRootDir = () => {
    return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
    const rootDir = getRootDir()

    // ensure the root directory exists, if not create it
    await ensureDir(rootDir)

    // get all the files in the root directory
    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false
    })

    // filter out only the notes, which are markdown files
    const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

    // get the note info from the filename for all the notes and return the promise
    return Promise.all(notes.map(getNoteInfoFromFilename))
}

// get the note info from the filename
export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {

    // get the file stats for the file to get the last edit time of the note
    const fileStats = await stat(`${getRootDir()}/${filename}`)

    // return the note info object with the title and last edit time
    return {
        title: filename.replace(/\.md$/, ''), // remove the .md extension from the filename
        lastEditTime: fileStats.mtimeMs // get the last edit time of the file in milliseconds
    }
}