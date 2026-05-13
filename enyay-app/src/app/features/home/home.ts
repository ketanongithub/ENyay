import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  features = [
    {
      title: 'Core Module',
      description: 'Interceptors, guards, services, and models — loaded once at app root.',
    },
    {
      title: 'Shared Module',
      description: 'Reusable directives, pipes, components, and validators.',
    },
    {
      title: 'Feature Modules',
      description: 'Lazy-loaded feature areas with dedicated routing.',
    },
    {
      title: 'Layout Module',
      description: 'Header, sidebar, footer, and main layout shell.',
    },
  ];
}
