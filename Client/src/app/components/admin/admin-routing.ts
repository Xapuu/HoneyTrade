import { Routes } from "@angular/router"
import {AdminComponent } from './admin.component'

export const routes: Routes = [
  {path: '', pathMatch: 'full',  component: AdminComponent },
]
