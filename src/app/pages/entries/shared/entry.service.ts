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
      super('spi/entries', injector);
    }

  public create(entry: Entry): Observable<Entry> {
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

  protected jsonDataToResources(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => {
        const entry = Entry.fromJson(element);
        entries.push(entry);
    });
    return entries;
  }

  protected jsonDataToResource(jsonData: any): Entry {
    return Entry.fromJson(jsonData);
  }
}
