import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PlacesComponent} from './places/places.component';
import {PeopleComponent} from './people/people.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {page: 'dashboard'}
  },
  {
    path: 'places',
    component: PlacesComponent,
    data: {page: 'places'}
  },

  {
    path: 'people',
    component: PeopleComponent,
    data: {page: 'people'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {page: 'profile'}
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
