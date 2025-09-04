import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private translateService = inject(TranslateService);
  language = "(" +localStorage.getItem('language') || 'en' + ")";
  constructor() {
    this.translateService.setDefaultLang('en');
    const savedLang = localStorage.getItem('language') || 'en';
    this.translateService.use(savedLang);
  }

  onChangeLanguage(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
  }
}