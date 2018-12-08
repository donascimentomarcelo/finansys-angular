import { Injectable, Injector } from '@angular/core';

import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService) {
      super('spi/entries', injector, Entry.fromJson);
    }

  public create(entry: Entry): Observable<Entry> {
    // this.setCategoryAndSendToServer(entry, this.create.bind(this))
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(object => {
        entry.category = object;

        return super.create(entry);
      })
    );

  }

  public update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(object => {
        entry.category = object;

        return super.update(entry);
      })
    );
  }

  // private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry> {
  //   return this.categoryService.getById(entry.categoryId).pipe(
  //     flatMap(object => {
  //       entry.category = object;
  //       return sendFn(sendFn);
  //     }),
  //     catchError(this.handlerError)
  //   );
  // }

}
