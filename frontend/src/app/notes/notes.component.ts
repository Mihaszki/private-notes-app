import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private notesService: NotesService) { }

  user: any = {};
  notesNumber: number = 0;

  isBackendError: boolean = false;
  backendErrorMessage: string = '';

  ngOnInit(): void {
    this.notesService.getNotes()
    .subscribe((data) => {
      this.user = data.user;
      this.user.notes.reverse();
      this.notesNumber = this.user.notes.length;
    },
    (error) => {
      this.isBackendError = true;
      this.backendErrorMessage = error;
    });
  }

  deleteNote(id: string) {
    if(id) {
      this.notesService.deleteNote(id).subscribe(() => {
        const index = this.user.notes.findIndex((item: any) => {
          return item._id === id;
        });
        if (index !== -1) this.user.notes.splice(index, 1);
        this.notesNumber = this.user.notes.length;
        this.isBackendError = false;
       },
       (error) => {
         this.isBackendError = true;
         this.backendErrorMessage = error;
       });
    }
  }
}