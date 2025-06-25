import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-component',
  imports: [NgOptimizedImage],
  templateUrl: './image-component.html',
  styleUrl: './image-component.css',
})
export class ImageComponent {}
