import { Injectable } from '@angular/core';
import { UserLoginModel } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private usernameSubject = new BehaviorSubject<string|null>(null);
    username$:Observable<string|null> = this.usernameSubject.asObservable();

    validateUserLogin(user:UserLoginModel)
    {
        if(user.username.length<3)
        {
            this.usernameSubject.next(null);
            this.usernameSubject.error("Too short for username");
        }
            
        else
            this.usernameSubject.next(user.username);
    }


  private dummyUsers: UserLoginModel[] = [
    { username: 'admin', password: 'root'},
    { username: 'user', password: 'root' }
  ];

  login(username: string, password: string): UserLoginModel | null {
    const found = this.dummyUsers.find(u => u.username === username && u.password === password);
    return found ? { ...found } : null;
  }

  // Store in local storage
  saveToLocal(user: UserLoginModel): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getFromLocal(): UserLoginModel | null {
    const data = localStorage.getItem('loggedInUser');
    return data ? JSON.parse(data) : null;
  }

  // Store in session storage
  saveToSession(user: UserLoginModel): void {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getFromSession(): UserLoginModel | null {
    const data = sessionStorage.getItem('loggedInUser');
    return data ? JSON.parse(data) : null;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loggedInUser');
  }
}
