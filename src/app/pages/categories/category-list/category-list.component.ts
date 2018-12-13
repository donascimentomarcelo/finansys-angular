import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/Category';
import { element } from '@angular/core/src/render3/instructions';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(
    protected categoryService: CategoryService,
  ) {
    super(categoryService);
  }

}
