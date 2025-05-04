import { Routes } from '@angular/router';
import { TriageComponent } from './triage/triage.component';

export const routes: Routes = [ 
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: TriageComponent},
];
