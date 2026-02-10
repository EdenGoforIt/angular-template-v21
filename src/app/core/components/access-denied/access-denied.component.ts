import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '@store/auth.store';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
})
export class AccessDeniedComponent {
  readonly #authStore = inject(AuthStore);
  readonly #router = inject(Router);

  // Expose auth store signals to template
  readonly user = this.#authStore.user;
  readonly isAuthenticated = this.#authStore.isAuthenticated;

  onSignOut(): void {
    this.#authStore.logout();
    void this.#router.navigate(['/login']);
  }

  goHome(): void {
    void this.#router.navigate(['/']);
  }
}
