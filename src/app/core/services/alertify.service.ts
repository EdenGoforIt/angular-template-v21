// Disabling any type check as callback can be any type
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  readonly #snackBar = inject(MatSnackBar);
  readonly #dialog = inject(MatDialog);

  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  /**
   * Show a confirmation dialog
   * @param message The message to display
   * @param okCallback Callback function to execute when user confirms
   */
  confirm(message: string, okCallback: () => any) {
    const dialogRef = this.#dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        okCallback();
      }
    });
  }

  /**
   * Show a success notification
   * @param message The success message to display
   */
  success(message: string) {
    this.#snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      panelClass: ['snackbar-success']
    });
  }

  /**
   * Show an error notification
   * @param message The error message to display
   */
  error(message: string) {
    this.#snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      duration: 5000, // Longer duration for errors
      panelClass: ['snackbar-error']
    });
  }

  /**
   * Show a warning notification
   * @param message The warning message to display
   */
  warning(message: string) {
    this.#snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      panelClass: ['snackbar-warning']
    });
  }

  /**
   * Show a general message notification
   * @param message The message to display
   */
  message(message: string) {
    this.#snackBar.open(message, 'Close', this.defaultConfig);
  }
}
