import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ColorService } from '../../Services/color.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-management-component',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './color-management-component.html',
  styleUrl: './color-management-component.css',
})
export class ColorManagementComponent implements OnInit {
  colorForm!: FormGroup;
  colors: any[] = [];
  editingColorId: number | null = null;

  private fb = inject(FormBuilder);
  private colorService = inject(ColorService);
  private router = inject(Router);

  ngOnInit(): void {
    this.colorForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.loadColors();
  }

  loadColors() {
    this.colorService.getAll(1).subscribe((data) => {
      this.colors = data.$values;
    });
  }

  // === Modal Control ===
  openCreateModal() {
    this.colorForm.reset();
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

  openEditModal(color: any) {
    this.editingColorId = color.colorId;
    this.colorForm.patchValue({ name: color.name });

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
  deleteColor(id: number) {
    if (confirm('Are you sure you want to delete this color?')) {
      this.colorService.delete(id).subscribe(() => {
        this.loadColors();
      });
    }
  }

  onCreateSubmit() {
    if (this.colorForm.invalid) return;

    const colorData = this.colorForm.value;

    this.colorService.createColor(colorData).subscribe(() => {
      this.loadColors();
      this.closeCreateModal();
    });
  }

  onEditSubmit() {
    if (this.colorForm.invalid || this.editingColorId == null) return;

    const colorData = this.colorForm.value;

    this.colorService
      .updateColor(this.editingColorId, colorData)
      .subscribe(() => {
        this.loadColors();
        this.closeEditModal();
      });
  }
}
