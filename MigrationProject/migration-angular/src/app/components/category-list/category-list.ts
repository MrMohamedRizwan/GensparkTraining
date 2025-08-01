import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../Services/category.service';
import { CategoryCreateComponent } from '../../component/category/category-create-component/category-create-component';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, RouterModule, CategoryCreateComponent],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
  // standalone: true,
})
export class CategoryList implements OnInit {
  categories: any;
  page = 1;
  totalPages = 0;

  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getAll(this.page).subscribe((data) => {
      this.categories = data.$values;
      this.totalPages = data.totalPages;
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this?')) {
      this.categoryService.delete(id).subscribe(() => {
        this.fetchCategories();
      });
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchCategories();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchCategories();
    }
  }
}
