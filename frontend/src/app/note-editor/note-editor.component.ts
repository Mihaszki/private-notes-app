import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { BackendError } from '../shared/backend.error';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {

  constructor(public backendError: BackendError, private notesService: NotesService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  isUserEditing: boolean = false;
  formTitle: string = 'Create A New Note';
  paramId: string = '';
  contentError: boolean = false;

  editorForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    text: ['', [Validators.required, Validators.maxLength(3000)]]
  });



  ngOnInit(): void {
    this.backendError.isError = false;
    this.route.params.subscribe(params => {
      // Same component is used for editing and creating new notes
      // Checking which version is needed
      if (this.router.url !== '/notes/new') {
        this.paramId = params['id'];
        this.isUserEditing = true;
        this.formTitle = 'Edit your note';
        this.notesService.getNotes()
        .subscribe((data) => {
          const getNoteById = data.user.notes.filter((item: any) => item._id === this.paramId);
          if(getNoteById.length === 0) {
            this.contentError = true;
          }
          else {
            this.editorForm.patchValue({
              title: getNoteById[0].title,
              text: getNoteById[0].body
            });
          }
        },
        error => this.backendError.error(error));
      }
      else {
        this.isUserEditing = false;
      }
    });
  }

  onSubmit() {
    if(this.isUserEditing) this.editNote();
    else this.saveNote();
  }

  saveNote() {
    this.notesService.saveNote(this.title?.value, this.text?.value)
    .subscribe(() => {
      this.router.navigate(['/notes']);
    },
    error => this.backendError.error(error));
  }

  editNote() {
    this.notesService.editNote(this.paramId, this.title?.value, this.text?.value)
    .subscribe(() => {
      this.router.navigate(['/notes']);
    }, error => this.backendError.error(error));
  }

  get text() { return this.editorForm.get('text'); }
  get title() { return this.editorForm.get('title'); }
}
