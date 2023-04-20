import { Action } from '../simpleflux/index.js'

export const createNote = (noteData) => new Action((state) => {
  return {
    ...state,
    notes: [...state.notes, noteData]
  }
}, noteData)

export const updateNote = (notesData) => new Action((state) => {
  return {
    ...state,
    notes: [...notesData]
  }
}, notesData)