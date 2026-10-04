import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';
  theme$ = new BehaviorSubject<Theme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.theme$.value);
  }

  toggle(): void {
    this.setTheme(this.theme$.value === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.theme$.next(theme);
    this.applyTheme(theme);
    localStorage.setItem(this.storageKey, theme);
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light';
  }
}
