import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient);
    }

    public getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
          map(this.jsonDataToResources.bind(this)),
          catchError(this.handlerError)
        );
      }

      public getById(id: number): Observable<T> {
        return this.http.get(`${this.apiPath}/${id}`).pipe(
          map(this.jsonDataToResource.bind(this)),
          catchError(this.handlerError)
        );
      }

      public create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
          map(this.jsonDataToResource.bind(this)),
          catchError(this.handlerError)
        );
      }

      public update(resource: T): Observable<T> {
        return this.http.put(`${this.apiPath}/${resource.id}`, resource).pipe(
          map(() => resource),
          catchError(this.handlerError)
        );
      }

      public delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiPath}/${id}`).pipe(
          map(() => null),
          catchError(this.handlerError)
        );
      }

      protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
        return resources;
      }

      protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
      }

      protected handlerError(error: any): Observable<any> {
        return throwError(error);
      }
}
