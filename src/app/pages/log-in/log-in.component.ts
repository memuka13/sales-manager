import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, TranslateModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {}
