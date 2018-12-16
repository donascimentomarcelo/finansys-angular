import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';


@NgModule({
  imports: [
  CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    RouterModule,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
  ]
})
export class SharedModule { }
