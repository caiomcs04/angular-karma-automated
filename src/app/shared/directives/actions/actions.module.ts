import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionDirective } from './actions.directive';



@NgModule({
  declarations: [ActionDirective],
  imports: [
    CommonModule,
  ],
  exports: [ActionDirective]
})
export class ActionsModule { }
