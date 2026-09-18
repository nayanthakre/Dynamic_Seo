import { Routes } from '@angular/router';
import { InterviewComponent } from './interview/interview';

export const routes: Routes = [
	{ path: '', redirectTo: 'interview/1', pathMatch: 'full' },
	{ path: 'interview/:id', component: InterviewComponent },
	{ path: '**', redirectTo: 'interview/1' }
];
