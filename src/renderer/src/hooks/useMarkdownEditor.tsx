import { MDXEditorMethods } from '@mdxeditor/editor';
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { useAtomValue, useSetAtom, } from 'jotai'
import { useRef } from 'react';
import { throttle } from 'lodash';
import { NoteContent } from '@shared/models';
import { autoSavingTime } from '@shared/constants'

export const useMarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom);
    const saveNote = useSetAtom(saveNoteAtom);
    const editorRef = useRef<MDXEditorMethods>(null);

    // use throttle to limit the number of times the note is saved
    // it will only save the note after the user stops typing for a certain amount of time
    const handleAutoSaving = throttle(
        async (content: NoteContent) => {
            if (!selectedNote) return

            await saveNote(content)
        },
        autoSavingTime,
        {
            leading: false,
            trailing: true
        }
    )

    return {
        selectedNote,
        editorRef,
        handleAutoSaving
    }
}