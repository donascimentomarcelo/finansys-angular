import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from './../shared/Category';
import { CategoryService } from './../shared/category.service';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildCategoryForm();
    this.setCurrentAction();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setTitle();
  }

  public submitForm(): void {
    this.submittingForm = true;

    if(this.currentAction === 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }

  }

  private setCurrentAction(): void {
    if (this.activatedRoute.url['value'][0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory(): void {
    if (this.currentAction === 'edit') {

      this.activatedRoute.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe((resp) => {
        this.category = resp;
        this.categoryForm.patchValue(resp);
      }, error => {
        console.log(error);
      });
    }
  }

  private setTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Criando categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando categoria : ' + categoryName;
    }
  }

  private createCategory(): void {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category)
      .subscribe(
        response => this.actionForSuccess(response),
        error => this.actionForError(error)
      );
  }

  private updateCategory(): void {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category)
      .subscribe(
        response => this.actionForSuccess(response),
        error => this.actionForError(error)
      );
  }

  private actionForSuccess(category: Category): void {
    toastr.success('Solicitação processada com sucesso!');

    this.router.navigateByUrl('categories', {skipLocationChange: true}).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    );
  }

  private actionForError(error: any) {
    toastr.error('Ocorreu um erro!');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicacao com servidor.']
    }
  }

}
