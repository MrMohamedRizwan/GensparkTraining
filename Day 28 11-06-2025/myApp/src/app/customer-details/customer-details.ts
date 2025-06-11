import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  imports: [],
  standalone:true,
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetails {
  name:string;
  email:string;
  phone:string;
  constructor(){
    this.name="Rizwan";
    this.email="rizwangmail.com";
    this.phone="9876543210";
  }
    likes = 0;
  dislikes = 0;

  like() {
    this.likes++;
  }

  dislike() {
    this.dislikes++;
  }

}
