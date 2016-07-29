import { provideRouter, RouterConfig }  from '@angular/router';
import { HomeComponent } from './home';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
