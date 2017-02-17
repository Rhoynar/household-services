import { Routes, RouterModule } from '@angular/router';
import {GuestHomeComponent,UserLoginComponent} from './components/index';

const APP_ROUTES: Routes = [
  
  { path: '', component: GuestHomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: '**', component: GuestHomeComponent }

];

export const routing = RouterModule.forRoot(APP_ROUTES);