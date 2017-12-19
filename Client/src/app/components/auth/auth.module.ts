import { NgModule } from "@angular/core"
import { authenticationComponents } from "./index"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

import {routes} from './auth-routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ...authenticationComponents
  ],
  exports: [
    ...authenticationComponents
  ],
  providers: [],
})

export class AuthenticationModule {

}
