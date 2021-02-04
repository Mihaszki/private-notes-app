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

  ngOnInit(): void {
    this.notesService.getNotes()
    .subscribe((data) => {
      this.user = data.user;
      console.log(this.user);
    }, error => console.log(error));
  }
}