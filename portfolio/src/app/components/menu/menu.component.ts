import { Component, inject, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private translateService = inject(TranslateService);
  menuOpen = false;

  constructor() {
    this.translateService.setDefaultLang('en');
    const savedLang = localStorage.getItem('language') || 'en';
    this.translateService.use(savedLang);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  onChangeLanguage(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-menu')) {
      this.menuOpen = false;
    }
  }
}