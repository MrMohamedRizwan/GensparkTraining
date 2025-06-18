import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule,NgChartsModule],
  templateUrl: './dashboard.html',
  standalone:true,
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  gender = '';
  role = '';
  state = '';
 genderChartLabels = ['Male', 'Female'];
  genderChartData = [0, 0];
  genderChartType: ChartType = 'doughnut';


  roleChartLabels = ['admin', 'moderator', 'user'];
  roleChartData = [10, 15, 20];
  roleChartType: ChartType = 'bar';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe( {
      next:(data:any)=>{
        this.users = data.users || [];
        this.filteredUsers = [...this.users];
        this.setGenderChartData();
      },
      error: (err: any) => {
        console.error('Error fetching users:', err);
      }
    });

  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>

      (!this.gender || user.gender === this.gender) &&
      (!this.role || user.role === this.role)&&
      (!this.state || (user.address?.state && user.address.state.toLowerCase().includes(this.state.toLowerCase())))
    );

  }
  setGenderChartData() {
    const maleCount = this.users.filter(u => u.gender === 'male').length;
    const femaleCount = this.users.filter(u => u.gender === 'female').length;
    this.genderChartData = [maleCount, femaleCount];
  }
}
