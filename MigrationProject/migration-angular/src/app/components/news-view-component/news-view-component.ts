import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NewsService } from '../../Services/news.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-view-component',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './news-view-component.html',
  styleUrl: './news-view-component.css',
})
export class NewsViewComponent implements OnInit {
  id: any;
  news: any;
  isEditMode = false;
  newsForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.newsService.getById(this.id).subscribe((response) => {
      this.news = response;
      this.initForm();
    });
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

  toggleEdit() {
    this.isEditMode = true;
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

    this.newsService.update(this.news.newsId, formData).subscribe(() => {
      this.isEditMode = false;
      this.ngOnInit();
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newsForm.patchValue({ image: file });
    }
  }
}
