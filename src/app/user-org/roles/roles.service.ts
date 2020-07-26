import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IRole } from '../model/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private usersUrl = 'http://localhost:3000/users';
  private rolesUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient) { }

  getRoles(orgIds: number[]): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.rolesUrl)
      .pipe(
        map(roles => roles),
        catchError(error => throwError('getRoles failed'))
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }

    return throwError(errorMessage);
  }
}
