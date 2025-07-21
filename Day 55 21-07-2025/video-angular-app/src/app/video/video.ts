import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { VideoService } from '../Services/VideoService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './video.html',
  styleUrl: './video.css',
})
export class Video {
  videoForm: FormGroup;
  videos: any[] = [];
  selectedFile: File | null = null;
  selectedVideo: any;

  constructor(private fb: FormBuilder, private videoService: VideoService) {
    this.videoForm = this.fb.group({
      title: ['Sample'],
      description: ['SampleVideo'],
    });
  }

  ngOnInit(): void {
    this.loadVideos();
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('title', this.videoForm.value.title);
    formData.append('description', this.videoForm.value.description);

    this.videoService.uploadVideo(formData).subscribe(() => {
      this.videoForm.reset();
      this.selectedFile = null;
      this.loadVideos();
    });
  }
  onSelect(id: string) {
    this.videoService.getById(id).subscribe((video) => {
      this.selectedVideo = video;
    });
  }

  loadVideos(): void {
    this.videoService.getVideos().subscribe((data) => {
      this.videos = data;
    });
  }
}
