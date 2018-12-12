import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;

  protected activatedRoute: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T

  ) {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit() {
    this.buildResourceForm();
    this.setCurrentAction();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setTitle();
  }

  public submitForm(): void {
    this.submittingForm = true;

    if(this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }

  }

  protected setCurrentAction(): void {
    if (this.activatedRoute.url['value'][0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource(): void {
    if (this.currentAction === 'edit') {

      this.activatedRoute.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')))
      ).subscribe((resp) => {
        this.resource = resp;
        this.resourceForm.patchValue(resp);
      }, error => {
        console.log(error);
      });
    }
  }

  protected setTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'novo';
  }

  protected editionPageTitle(): string {
    return 'edição';
  }

  protected createResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm);

    this.resourceService.create(resource.value)
      .subscribe(
        response => this.actionForSuccess(response),
        error =>  {
          this.actionForError(error);
          console.log(error);
        }
      );
  }

  protected updateResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm);

    this.resourceService.update(resource.value)
      .subscribe(
        response => this.actionForSuccess(response),
        error => {
          this.actionForError(error);
          console.log(error);
        }
      );
  }

  protected actionForSuccess(resource: T): void {
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.activatedRoute.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
    );
  }

  protected actionForError(error: any) {
    toastr.error('Ocorreu um erro!');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicacao com servidor.']
    }
  }

  protected abstract buildResourceForm(): void;

}
