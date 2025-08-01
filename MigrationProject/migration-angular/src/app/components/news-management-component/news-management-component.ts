import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewsService } from '../../Services/news.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
declare const bootstrap: any;
@Component({
  selector: 'app-news-management-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './news-management-component.html',
  styleUrl: './news-management-component.css',
})
export class NewsManagementComponent implements OnInit {
  newsForm!: FormGroup;
  isEditMode = false;

  newsList: any;
  news: any;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newsForm.patchValue({ image: file });
    }
  }
  ngOnInit(): void {
    this.loadNews();
  }
  toggleEdit() {
    this.isEditMode = true;
  }
  initForm() {
    this.newsForm = this.fb.group({
      title: [this.news.title],
      shortDescription: [this.news.shortDescription],
      image: [null],
      content: [this.news.content],
      status: [this.news.status],
    });
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.newsForm.value.title);
    formData.append('shortDescription', this.newsForm.value.shortDescription);
    formData.append('content', this.newsForm.value.content);
    formData.append('status', this.newsForm.value.status);

    if (this.newsForm.value.image) {
      formData.append('image', this.newsForm.value.image);
    }

    this.newsService.create(formData).subscribe(() => {
      this.isEditMode = false;
      this.ngOnInit();
    });
  }

  loadNews() {
    this.newsService.getAll().subscribe({
      next: (data) => (this.newsList = data.$values),
      error: (err) => console.error('Failed to load news', err),
    });
  }

  openCreateModal() {
    // logic to open modal and handle creation
  }

  openEditModal(item: any) {
    // logic to open edit modal with `item` data
  }

  openDetailsModal(item: any) {
    this.router.navigate(['/news-management/views', item.newsId]);
  }

  openDeleteModal(item: any) {
    alert('Are you sure Ypu want to Delete');
    this.newsService.delete(item.newsId).subscribe({
      next: () => {
        this.loadNews();
        alert('News deleted successfully');
      },
      error: (err) => {
        console.error('Failed to delete news', err);
        alert('Failed to delete news');
      },
    });
  }

  exportCSV() {
    this.newsService.getcsv().subscribe({
      next: () => {
        console.log('File Dowloaded');
      },
    });
  }

  exportExcel() {
    // Logic to call backend or generate Excel from this.newsList
  }
}
