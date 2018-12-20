import { Injectable, Injector } from '@angular/core';

import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import * as moment from 'moment';

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

  public getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  filterByMonthAndYear(entries: Entry[], month: number, year: number): any {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, 'DD/MM/YYYY');
      const monthMatches = entryDate.month() + 1 === month;
      const yearMatches = entryDate.year() + 1 === year;

      // tslint:disable-next-line:curly
      if(monthMatches && yearMatches) return entry;
    });
  }

}
