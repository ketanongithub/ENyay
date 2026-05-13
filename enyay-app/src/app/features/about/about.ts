import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class AboutComponent {
  appVersion = '1.0.0';
}
