import { Component } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { fadeAnimation } from './shared/route.transition.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  constructor(private router: Router) {
  }

  showFooter: boolean = false;
  showHeader: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd) { 
        const url = routerData.url.split('?')[0];
        if(url !== '/login' && url !== '/register') {
          this.showFooter = true;
          this.showHeader = true;
        }
        else {
          this.showFooter = false;
          this.showHeader = false;
        }
      }
    });
  }
}
