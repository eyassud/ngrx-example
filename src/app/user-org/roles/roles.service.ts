import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { IRole } from '../model/role.model';
import { ErrorHandler } from 'src/app/shared/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private rolesUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) { }

  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.rolesUrl)
      .pipe(
        delay(200),
        map(roles => roles),
        catchError(error => this.errorHandler.handleError(error))
      );
  }
}
