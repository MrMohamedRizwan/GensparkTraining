import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  username$:any;
  usrname:string|null = "";

  constructor(private userService:AuthService)
  {
    //this.username$ = this.userService.username$;
    this.userService.username$.subscribe(
      {
       next:(value) =>{
          this.usrname = value ;
        },
        error:(err)=>{
          alert(err);
        }
      }
    )
  }
}
