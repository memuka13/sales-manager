import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthStateFacade } from 'src/store/auth/auth.facade';
import { authActions } from 'src/store/auth/auth.action';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly store = inject(Store);
  private readonly authStateFacade = inject(AuthStateFacade);
  readonly currentUser$ = this.authStateFacade.getCurrentUser();

  logout() {
    this.store.dispatch(authActions.logoutUser());
  }
}
