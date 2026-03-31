import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  icon: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  experiences: ExperienceItem[] = [];
  private langChangeSub!: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadItems();
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadItems();
    });
  }

  private loadItems(): void {
    this.translate.get('EXPERIENCE_PAGE.ITEMS').subscribe((items: ExperienceItem[]) => {
      this.experiences = items;
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }
}
