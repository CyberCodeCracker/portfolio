import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private translateService = inject(TranslateService);
  private sidebarService = inject(SidebarService);
  private themeService = inject(ThemeService);
  activeSection = 'home';
  theme: Theme = 'light';

  private sectionIds = ['home', 'experience', 'education', 'projects', 'certifications', 'contact'];
  private sectionObserver?: IntersectionObserver;
  private themeSub?: Subscription;

  ngOnInit(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (el) this.sectionObserver.observe(el);
    }

    this.themeSub = this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.themeSub?.unsubscribe();
  }

  scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.innerWidth <= 768) {
      this.sidebarService.close();
    }
  }

  onChangeLanguage(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
  }

  toggleTheme() {
    this.themeService.toggle();
  }
}
