import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly isMobile = window.innerWidth <= 768;
  collapsed$ = new BehaviorSubject<boolean>(this.isMobile);

  constructor() {
    document.body.classList.toggle('sidebar-collapsed', this.isMobile);
  }

  toggle(): void {
    this.setCollapsed(!this.collapsed$.value);
  }

  close(): void {
    this.setCollapsed(true);
  }

  setCollapsed(value: boolean): void {
    this.collapsed$.next(value);
    document.body.classList.toggle('sidebar-collapsed', value);
  }
}
