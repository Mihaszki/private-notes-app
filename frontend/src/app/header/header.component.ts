import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logoutSession();
  }

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isSticky = window.pageYOffset >= 50;
  }

}
