import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-update-inmate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-update-inmate.html',
  styleUrls: ['./add-update-inmate.scss'],
})
export class AddUpdateInmateComponent {}
