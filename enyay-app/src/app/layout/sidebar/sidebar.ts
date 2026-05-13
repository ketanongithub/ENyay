import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent {
  @Input() isCollapsed = false;

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    {
      label: 'Inmate Management',
      icon: 'people',
      isExpanded: false,
      children: [
        { label: 'Add / Update Inmate', icon: 'add', route: '/inmate-management/add-update' },
        { label: 'Inmate List', icon: 'list', route: '/inmate-management/list' },
      ],
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSubmenu(item: NavItem): void {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
