import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss']
})
export class ViewNoteComponent implements OnInit {

  constructor(private notesService: NotesService, private route: ActivatedRoute) { }

  noteObj: any = {};
  paramId: string = '';
  isBackendError: boolean = false;
  backendErrorMessage: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paramId = params['id'];
      this.notesService.getNotes()
      .subscribe((data) => {
        this.noteObj = data.user.notes.filter((item: any) => item._id === this.paramId)[0];
        if(!this.noteObj) {
          this.isBackendError = true;
          this.backendErrorMessage = 'The note doesn\'t exists!';
        }
        this.isBackendError = false;
      }, error => {
        this.isBackendError = true;
        this.backendErrorMessage = error;
      });
    });
  }
}
