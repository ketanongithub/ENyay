import { Component, Input } from '@angular/core';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
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
    { label: 'Home', icon: '🏠', route: '/home' },
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'About', icon: 'ℹ️', route: '/about' },
  ];
}
