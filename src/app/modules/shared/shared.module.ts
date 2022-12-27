import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormSectionTitleDirective } from './directives/form-section-title/form-section-title.directive';



@NgModule({
  declarations: [
    ProductInfoComponent,
    FormSectionTitleDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductInfoComponent,
    FormSectionTitleDirective
  ]
})
export class SharedModule { }
