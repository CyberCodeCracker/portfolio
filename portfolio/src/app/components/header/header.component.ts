import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, MenuComponent],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = false;
  private sub?: Subscription;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sub = this.sidebarService.collapsed$.subscribe((value) => {
      this.collapsed = value;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  scrollToTop() {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
