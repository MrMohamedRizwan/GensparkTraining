import { Component } from '@angular/core';
import { CategoryList } from '../category-list/category-list';

@Component({
  selector: 'app-sidebar',
  imports: [CategoryList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {}
