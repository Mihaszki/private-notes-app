import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { BackendError } from '../shared/backend.error';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss']
})
export class ViewNoteComponent implements OnInit {

  constructor(public backendError: BackendError, private notesService: NotesService, private route: ActivatedRoute) { }

  noteObj: any = {};
  paramId: string = '';
  isBackendError: boolean = false;
  backendErrorMessage: string = '';

  ngOnInit(): void {
    this.backendError.isError = false;
    this.route.params.subscribe(params => {
      this.paramId = params['id'];
      this.notesService.getNotes()
      .subscribe((data) => {
        this.noteObj = data.user.notes.filter((item: any) => item._id === this.paramId)[0];
        if(!this.noteObj) {
          this.backendError.error('The note doesn\'t exist!');
        }
      }, error => this.backendError.error(error));
    });
  }
}
