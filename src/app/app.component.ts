import {Component, HostListener} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('logo', [
      state('up', style({
        width: '200px',
        transform: 'translateY(-170px)'
      })),
      state('down', style({
        width: '500px',
        transform: 'translateY(0)'
      })),
      transition('up <=> down', animate('350ms ease-in-out'))
    ]),
    trigger('background', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(1.1)'}),
        animate(350, style({opacity: 1, transform: 'scale(1)'}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(150, style({opacity: 0}))
      ])
    ]),
    trigger('title', [
      transition(':enter', [
        style({opacity: 0}),
        animate(350, style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(350, style({opacity: 0}))
      ])
    ])
  ]
})
export class AppComponent {
  isScrolled = false;

  logoState = 'down';
  page: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.subscribeNavigationEnd();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0;
    this.updateLogostate();

  }

  private subscribeNavigationEnd() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        if (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => this.handleNavigation(data));
  }

  private handleNavigation(data) {
    this.page = data.page;

    this.updateLogostate();

    this.scrollTop();
  }

  private updateLogostate() {
    if (this.isScrolled) {
      this.logoState = 'up';
    } else if (!this.isDashboard) {
      this.logoState = 'up';
    } else {
      this.logoState = 'down';
    }
  }

  private scrollTop() {
    window.scrollTo(0, 0);
  }


  get isDashboard() {
    return this.page === 'dashboard';
  }

  get isProfile() {
    return this.page === 'profile';
  }

  get isPlaces() {
    return this.page === 'places';
  }

  get isPeople() {
    return this.page === 'people';
  }
}
