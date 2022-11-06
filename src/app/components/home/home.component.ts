import { Component, OnInit } from '@angular/core';
import { INote } from 'src/app/models/INote';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes:INote[] = [];
  noteToEdit:INote={ id:-1, title:'',description:'',id_user:''}
  constructor(public noteService:NoteService) {
   }

  ngOnInit(): void {
  }

  
  savingNote(note:INote){
    this.noteService.savingNote(note);
  }
  removingNote(noteToDelete:INote){
    this.noteService.removeNote(noteToDelete);
  }
  activateEditNote(note:INote){
    this.noteToEdit=note
  }
  editingNote(noteToEdit:INote){
    this.noteService.editNote(noteToEdit);
  }
}
