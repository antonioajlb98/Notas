import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { INote } from '../models/INote';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: INote[] = [];
  private dbPath = '/notes';
  notesRef!: AngularFirestoreCollection<any>;


  constructor(private db: AngularFirestore, private loginService:LoginService) {
    this.notesRef = db.collection(this.dbPath)
    this.notesRef.get().subscribe(d => {
      let docs = d.docs;
      let notesdb = docs.map(d => {
        return { id: d.id, ...d.data() }
      })
      this.notes=notesdb.filter((note)=>note.id_user==loginService.user.id)
    })
  }
  public async savingNote(note: INote) {
    try {
      let dRef: DocumentReference<any> = await this.notesRef.add({ ...note });
      note.id = dRef.id;
      this.notes.push(note);
    } catch (error) {
      console.log(error);
    }
  }
  getAllNotes(): INote[] {
    return this.notes;
  }
  removeNote(note:INote):Promise<void>{
    let newNotes = this.notes.filter((n)=>{
      return n.id!=note.id;
    });
    this.notes = newNotes;
    return this.notesRef.doc(note.id?.toString()).delete();
  }
  editNote(note:INote):Promise<void>{
    let idtobeupdated:any;
    let data:any;
    this.notes.forEach(n=>{
      if(n.id==note.id){
        n.title=note.title;
        n.description=note.description;
        let {id,...newData} = note;
        idtobeupdated=id;
        data=newData;
      }
    });
    if(idtobeupdated){
      return this.notesRef.doc(idtobeupdated as string).update(data);
    }else{
      return Promise.resolve();
    }
  }
}
