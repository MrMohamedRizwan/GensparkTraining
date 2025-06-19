import { BehaviorSubject, Observable } from "rxjs";
import { UserLoginModel } from "../models/UserLoginModel";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../models/signupmodel";


@Injectable()
export class UserService
{
    private http = inject(HttpClient);
    private usernameSubject = new BehaviorSubject<string|null>(null);
    username$:Observable<string|null> = this.usernameSubject.asObservable();
    private users$ = new BehaviorSubject<User[]>([
    { username: 'john', email: 'john@example.com', password: '', role: 'User' },
    { username: 'admin1', email: 'admin@example.com', password: '', role: 'Admin' },
    { username: 'guest1', email: 'guest@example.com', password: '', role: 'Guest' },
  ]);

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  addUser(user: User) {
    const current = this.users$.getValue();
    this.users$.next([...current, user]);
  }

    
  
  
  
  
  
  
  validateUserLogin(user:UserLoginModel)
    {
        if(user.username.length<3)
        {
            this.usernameSubject.next(null);
            
        }
            
        else
        {
            this.callLoginAPI(user).subscribe(
                {
                    next:(data:any)=>{
                        this.usernameSubject.next(user.username);
                        localStorage.setItem("token",data.accessToken)
                    }
                }
            )
            
        }
            
    }
    
    callGetProfile()
    {
        var token = localStorage.getItem("token")
        const httpHeader = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        })
        return this.http.get('https://dummyjson.com/auth/me',{headers:httpHeader});
        
    }

    callLoginAPI(user:UserLoginModel)
    {
        return this.http.post("https://dummyjson.com/auth/login",user);
    }
    logout(){
        this.usernameSubject.next(null);
    }
}