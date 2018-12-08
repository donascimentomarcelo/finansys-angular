import { Injectable, Injector } from '@angular/core';

import { Category } from './Category';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(protected injector: Injector) {
    super('spi/categories', injector, Category.fromJson);
  }

}
