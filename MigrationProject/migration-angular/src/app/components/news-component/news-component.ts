import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsService } from '../../Services/news.service';

@Component({
  selector: 'app-news-component',
  imports: [NgxPaginationModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './news-component.html',
  styleUrl: './news-component.css',
})
export class NewsComponent implements OnInit {
  newsList: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews(this.currentPage);
  }

  loadNews(page: number): void {
    this.newsService.getAll().subscribe((response) => {
      this.newsList = response.$values;
      this.totalItems = response.totalItems;
      this.currentPage = page;
    });
  }

  onPageChange(page: number): void {
    this.loadNews(page);
  }
}
