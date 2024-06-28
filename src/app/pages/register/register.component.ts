import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from './validators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { authActions } from 'src/store/auth/auth.action';
import { CurrentUser } from 'src/app/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private readonly store = inject(Store);

  readonly form = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator() }
  );

  submit() {
    const username = this.form.value.username;
    const password = this.form.value.password;
    const displayName: CurrentUser = {
      name: this.form.value.name!,
      surname: this.form.value.surname!,
      username: this.form.value.username!,
      dateRegistered: new Date().toISOString(),
    };
    if (username && password && displayName)
      this.store.dispatch(
        authActions.registerUser({ username, password, displayName })
      );
  }
}
