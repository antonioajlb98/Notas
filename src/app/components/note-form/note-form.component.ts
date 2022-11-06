import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { INote } from 'src/app/models/INote';
import { LoginService } from 'src/app/services/login.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  @Input('noteToEditInput') noteToEditInput:INote = {id:-1, title:'', description:'', id_user:''};
  @Output() saveNote = new EventEmitter<INote>();
  @Output() editNote = new EventEmitter<INote>();
  note_form: FormGroup;

  constructor(private formBuilder:FormBuilder, private loginService:LoginService) {
    this.note_form = formBuilder.group({
      id:[-1],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnChanges($changes:any){
    if($changes.noteToEditInput && $changes.noteToEditInput.currentValue){
      this.note_form.patchValue($changes.noteToEditInput.currentValue);
      console.log($changes.noteToEditInput.currentValue);
      
    }
  }

  ngOnInit(): void {
  }

  saveNoteFn(){
    if(this.note_form.valid){
      let note : INote = {
        title: this.note_form.value.title,
        description: this.note_form.value.description,
        id_user:this.loginService.user.id
      }
      this.saveNote.emit(note);
      this.note_form.patchValue({
        title:'',
        description:''
      })
      console.log(note);
    }
  }
  editNoteFn(){
    if(this.note_form.valid){
      let note : INote = {
        id: this.note_form.value.id,
        title: this.note_form.value.title,
        description: this.note_form.value.description,
        id_user:this.loginService.user.id
      }
      this.editNote.emit(note);
      this.note_form.patchValue({
        id:-1,
        title:'',
        description:''
      })
      this.noteToEditInput={id:-1, title:'', description:'',id_user:''}
    }
  }
}
