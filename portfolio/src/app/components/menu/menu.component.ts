import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';

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
  activeSection = 'home';

  private sectionIds = ['home', 'experience', 'education', 'projects', 'certifications', 'contact'];
  private sectionObserver?: IntersectionObserver;

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
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
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
}
