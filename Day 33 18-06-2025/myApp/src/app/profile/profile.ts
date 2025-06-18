import { Component, inject } from '@angular/core';
import { UserService } from '../services/UserService';
import { userModel } from '../models/userModel';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
     userService = inject(UserService);
     profileData:userModel = new userModel();

     constructor(){
        this.userService.callGetProfile().subscribe({
          next:(data:any)=>{
            this.profileData = userModel.fromForm(data);
          }
        })
     }

}