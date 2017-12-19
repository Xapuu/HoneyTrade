import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component';

import { ErrorComponent } from './components/error/error.component';

import { NotFoundComponent } from './components/shared/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: './components/auth/auth.module#AuthenticationModule'},
  
  { path: 'error', component: ErrorComponent },

  { path: '**', component: NotFoundComponent }
];
