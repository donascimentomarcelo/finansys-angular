import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/Category';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories: Category[] = [];
  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.carregaCategorias();
  }

  public carregaCategorias(): void {
    this.categoryService.getAll()
      .subscribe((resp) => {
        this.categories = resp;
      });
  }

  public delete(category: Category): void {
    this.categoryService.delete(category.id)
      .subscribe(() => {
        this.categories = this.categories.filter(element => element !== category);
      }, error => {
        console.log(error);
      });
  }

}
