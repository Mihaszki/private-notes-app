import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { ViewNoteComponent } from './view-note/view-note.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [AuthService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthService] },
  { path: 'notes', component: NotesComponent, canActivate: [AuthService] },
  { path: 'notes/new', component: NoteEditorComponent, canActivate: [AuthService] },
  { path: 'notes/view/:id', component: ViewNoteComponent, canActivate: [AuthService] },
  { path: 'notes/edit/:id', component: NoteEditorComponent, canActivate: [AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
