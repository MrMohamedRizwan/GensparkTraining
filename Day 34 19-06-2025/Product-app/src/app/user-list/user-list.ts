import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
  tap,
  combineLatest,
  startWith,
  BehaviorSubject
} from 'rxjs';
import { User } from '../models/signupmodel';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users: User[] = [];
  allUsers: User[] = [];

  searchString = '';
  selectedRole = 'All';

  searchSubject = new Subject<string>();
  roleSubject = new BehaviorSubject<string>('All');

  loading = false;
  limit = 5;
  skip = 0;
  total = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
      this.total = users.length;
      this.applyFilters(); 
    });

    combineLatest([
      this.searchSubject.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        startWith('')
      ),
      this.roleSubject.asObservable()
    ]).subscribe(([search, role]) => {
      this.searchString = search;
      this.selectedRole = role;
      this.skip = 0;
      this.applyFilters();
    });
  }

  handleSearch(): void {
    this.searchSubject.next(this.searchString);
  }

  onRoleChange(role: string): void {
    this.roleSubject.next(role);
  }

  applyFilters(): void {
    this.loading = true;
    const filtered = this.allUsers.filter(user => {
      const matchesName = user.username.toLowerCase().includes(this.searchString.toLowerCase());
      const matchesRole = this.selectedRole === 'All' || user.role === this.selectedRole;
      return matchesName && matchesRole;
    });

    this.total = filtered.length;
    this.users = filtered.slice(0, this.limit);
    this.loading = false;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition >= threshold && this.users.length < this.total && !this.loading) {
      this.loadMore();
    }
  }

  loadMore(): void {
    this.loading = true;
    this.skip += this.limit;

    setTimeout(() => {
      const filtered = this.allUsers.filter(user => {
        const matchesName = user.username.toLowerCase().includes(this.searchString.toLowerCase());
        const matchesRole = this.selectedRole === 'All' || user.role === this.selectedRole;
        return matchesName && matchesRole;
      });

      this.users = [...this.users, ...filtered.slice(this.skip, this.skip + this.limit)];
      this.loading = false;
    }, 400);
  }
}
