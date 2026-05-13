import { Component, Input } from '@angular/core';

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
    { label: 'About', icon: 'info', route: '/about' },
  ];

  toggleSubmenu(item: NavItem): void {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }
}
