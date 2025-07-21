import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Video } from './video/video';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Video],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'video-angular-app';
}
