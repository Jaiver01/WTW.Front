import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User, UserAccount } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private urlUser = environment.apiPath + 'User';
  private urlAccount = environment.apiPath + 'Account';

  constructor(private http: HttpClient) { }

  login(user: UserAccount): Observable<User> {
    return this.http.post<User>(`${this.urlAccount}/login`, user);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.urlAccount}/logout`, {});
  }

  register(user: User): Observable<void> {
    return this.http.post<void>(`${this.urlUser}`, user);
  }
}
