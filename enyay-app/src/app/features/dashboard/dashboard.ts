import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  stats = [
    { label: 'Total Users', value: '1,234', icon: '👥' },
    { label: 'Active Sessions', value: '56', icon: '🔗' },
    { label: 'Revenue', value: '$12,345', icon: '💰' },
    { label: 'Growth', value: '+12.5%', icon: '📈' },
  ];
}
