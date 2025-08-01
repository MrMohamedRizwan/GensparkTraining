import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryService } from '../../../Services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-create-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './category-create-component.html',
  styleUrl: './category-create-component.css',
})
export class CategoryCreateComponent implements OnInit {
  categoryForm!: FormGroup;
  categories: any[] = [];
  editingCategoryId: number | null = null;

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll(1).subscribe((data) => {
      this.categories = data.$values;
    });
  }

  // === Modal Control ===
  openCreateModal() {
    this.categoryForm.reset();
    const modal = document.getElementById('createModal');
    modal!.classList.add('show');
    modal!.style.display = 'block';
    modal!.setAttribute('aria-modal', 'true');
    modal!.removeAttribute('aria-hidden');
  }

  closeCreateModal() {
    const modal = document.getElementById('createModal');
    modal!.classList.remove('show');
    modal!.style.display = 'none';
  }

  openEditModal(cat: any) {
    this.editingCategoryId = cat.categoryId;
    this.categoryForm.patchValue({ name: cat.name });

    const modal = document.getElementById('editModal');
    modal!.classList.add('show');
    modal!.style.display = 'block';
    modal!.setAttribute('aria-modal', 'true');
    modal!.removeAttribute('aria-hidden');
  }

  closeEditModal() {
    const modal = document.getElementById('editModal');
    modal!.classList.remove('show');
    modal!.style.display = 'none';
  }

  // === API Calls ===
  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.delete(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  onCreateSubmit() {
    if (this.categoryForm.invalid) return;

    const categoryData = this.categoryForm.value;

    this.categoryService.createCategory(categoryData).subscribe(() => {
      this.loadCategories();
      this.closeCreateModal();
    });
  }

  onEditSubmit() {
    if (this.categoryForm.invalid || this.editingCategoryId == null) return;

    const categoryData = this.categoryForm.value;

    this.categoryService
      .updateCategory(this.editingCategoryId, categoryData)
      .subscribe(() => {
        this.loadCategories();
        this.closeEditModal();
      });
  }
}
