import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';
import { ErrorHandler } from 'src/app/shared/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private organizationsUrl = 'http://localhost:3000/organizations';

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) { }

  getOrganizations(): Observable<TreeNode> {
    return this.http.get<TreeNode>(this.organizationsUrl)
      .pipe(
        delay(200),
        catchError(error => this.errorHandler.handleError(error))
      );
  }
}
