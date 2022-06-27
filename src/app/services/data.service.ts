import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, Timestamp } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface Note{
  id?: string;
  title: string;
  text: string;
  status: boolean;
  dtCriacao: Timestamp;
  dtFim: Timestamp;
  usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note> {
    const notesRef = doc(this.firestore, `notes/${id}`);
    return docData(notesRef, { idField: 'id' }) as Observable<Note>;
  }

  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  deleteNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef,
      {title: note.title, text: note.text, status:note.status, dtCriacao: note.dtCriacao, dtFim: note.dtFim, usuario: note.usuario});
  }

  updateStatusNote(statusValue: boolean, note: Note){
    if (statusValue) {
      note.dtFim = Timestamp.now();
    } else {
      note.dtFim = note.dtCriacao;
    }
    note.status = statusValue;
    this.updateNote(note);
  }

}
