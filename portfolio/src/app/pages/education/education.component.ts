import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'certification';
  icon: string;
  credentialUrl?: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {
  timelineItems: TimelineItem[] = [];
  private langChangeSub!: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadItems();
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadItems();
    });
  }

  private loadItems(): void {
    this.translate.get('EDUCATION_PAGE.ITEMS').subscribe((items: TimelineItem[]) => {
      this.timelineItems = items;
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }
}
