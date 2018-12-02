import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Entry } from './entry.model';
import { CategoryService } from './../../categories/shared/category.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = 'spi/entries';

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService) { }

  public getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToEntries)
    );
  }

  public getById(id: number): Observable<Entry> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToEntry)
    );
  }

  public create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(object => {
        entry.category = object;

        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handlerError),
          map(this.jsonDataToEntry)
        );
      })
    );

  }

  public update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(object => {
        entry.category = object;

        return this.http.put(`${this.apiPath}/${entry.id}`, entry).pipe(
          catchError(this.handlerError),
          map(() => entry)
        );
      })
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      catchError(this.handlerError),
      map(() => null)
    );
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => {
        const entry = Object.assign(new Entry(), element);
        entries.push(entry);
    });
    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private handlerError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
