import { provideRouter, Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { PadminComponent} from './padmin/padmin.component';

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'index', component: IndexComponent},
    {path: 'login', component: LoginComponent},
    {path: 'AdminPanel', component: PadminComponent}
];
provideRouter(routes);
