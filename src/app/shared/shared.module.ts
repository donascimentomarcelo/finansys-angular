import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';


@NgModule({
  imports: [
  CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    RouterModule,
    PageHeaderComponent,
  ]
})
export class SharedModule { }
