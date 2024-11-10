import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { PadminComponent} from './padmin/padmin.component';

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'index', component: IndexComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'login', loadComponent: () => LoginComponent},
    {path: 'padmin', component: PadminComponent},
];
