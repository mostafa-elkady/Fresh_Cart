import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading = false;

  show(): void {
    this.isLoading = true;
    // Show loading screen logic
  }

  hide(): void {
    this.isLoading = false;
    // Hide loading screen logic
  }

  get loading(): boolean {
    return this.isLoading;
  }
}