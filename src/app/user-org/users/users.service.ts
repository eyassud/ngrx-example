import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { IUser } from '../model/user.model';
import { ErrorHandler } from 'src/app/shared/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) { }

  getUsers(orgIds: number[]): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl)
      .pipe(
        delay(200),
        map(users => users.filter(user => user.roles.find(role => orgIds.includes(role.orgId))),
        catchError(error => this.errorHandler.handleError(error))
      ));
  }
}
