import { NgModule } from "@angular/core"
import { adminComponents } from "./index"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

import {routes} from './admin-routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ...adminComponents
  ],
  exports: [
    ...adminComponents
  ],
  providers: [],
})

export class AdminModule {

}
