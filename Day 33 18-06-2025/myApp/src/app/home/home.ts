import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  username: string = '';
  router=inject(ActivatedRoute);
  ngOnInit():void{
    console.log('Home component initialized');
    this.username=this.router.snapshot.params['username'];
  }
}
