import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected apiPath: string,
        protected injector: Injector
    ) {
        this.http = injector.get(HttpClient);
    }

    public getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
          catchError(this.handlerError),
          map(this.jsonDataToResources)
        );
      }

      public getById(id: number): Observable<T> {
        return this.http.get(`${this.apiPath}/${id}`).pipe(
          catchError(this.handlerError),
          map(this.jsonDataToResource)
        );
      }

      public create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
          catchError(this.handlerError),
          map(this.jsonDataToResource)
        );
      }

      public update(resource: T): Observable<T> {
        return this.http.put(`${this.apiPath}/${resource.id}`, resource).pipe(
          catchError(this.handlerError),
          map(() => resource)
        );
      }

      public delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiPath}/${id}`).pipe(
          catchError(this.handlerError),
          map(() => null)
        );
      }

      protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(element => resources.push(element as T));
        return resources;
      }

      protected jsonDataToResource(jsonData: any): T {
        return jsonData as T;
      }

      protected handlerError(error: any): Observable<any> {
        return throwError(error);
      }
}
