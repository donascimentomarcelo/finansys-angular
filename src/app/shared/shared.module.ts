import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [BreadCrumbComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
  ]
})
export class SharedModule { }
