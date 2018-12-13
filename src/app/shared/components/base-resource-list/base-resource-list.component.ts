import { OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  protected resources: T[] = [];
  constructor(
    protected resourceService: BaseResourceService<T>,
  ) { }

  ngOnInit() {
    this.carregaLancamentos();
  }

  protected carregaLancamentos(): void {
    this.resourceService.getAll()
      .subscribe(
        resp => this.resources = resp.sort((a, b) => b.id - a.id),
        error => alert('erro')
      );
  }

  protected delete(resource: T): void {
    this.resourceService.delete(resource.id)
      .subscribe(() => {
        this.resources = this.resources.filter(element => element !== resource);
      }, error => {
        console.log(error);
      });
  }

}
