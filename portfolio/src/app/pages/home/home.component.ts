// home.component.ts
import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [HeaderComponent, TranslateModule]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('typedIntro', { static: false }) typedIntro!: ElementRef;
  @ViewChild('typedRest', { static: false }) typedRest!: ElementRef;
  private langChangeSubscription!: Subscription;
  /** Store ALL pending timeout IDs so we can cancel the entire chain */
  private typingTimeouts: ReturnType<typeof setTimeout>[] = [];
  private isFirstVisit: boolean;

  constructor(private translate: TranslateService) {
    this.isFirstVisit = !sessionStorage.getItem('portfolio_visited');
  }

  ngAfterViewInit(): void {
    this.renderText();

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      // Language changed — cancel every queued character timeout first
      this.clearAllTimeouts();
      this.renderText();
    });
  }

  /** Cancel every pending typing timeout — fixes the mixed-language bug */
  private clearAllTimeouts(): void {
    for (const id of this.typingTimeouts) {
      clearTimeout(id);
    }
    this.typingTimeouts = [];
  }

  private renderText(): void {
    this.translate.get('ABOUT').subscribe((text: string) => {
      const introEl: HTMLElement = this.typedIntro.nativeElement;
      const restEl: HTMLElement = this.typedRest.nativeElement;

      const lines = text
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter((line: string) => line.trim() !== '');

      const introLines = lines.slice(0, 2);
      const restLines = lines.slice(2);

      // Always clear previous content
      introEl.textContent = '';
      restEl.textContent = '';
      introEl.classList.remove('slide-in');
      restEl.classList.remove('slide-in');

      if (this.isFirstVisit) {
        // First visit: typing animation
        this.typeLines(introEl, introLines, 0, () => {
          this.typeLines(restEl, restLines, 0, () => {
            // Mark as visited only after animation completes
            sessionStorage.setItem('portfolio_visited', 'true');
            this.isFirstVisit = false;
          });
        });
      } else {
        // Returning visit: render instantly with slide-in animation
        this.renderInstant(introEl, introLines);
        this.renderInstant(restEl, restLines);
        // Trigger reflow before adding class so the animation plays
        void introEl.offsetWidth;
        introEl.classList.add('slide-in');
        restEl.classList.add('slide-in');
      }
    });
  }

  /** Render all lines instantly (no typing) */
  private renderInstant(element: HTMLElement, lines: string[]): void {
    lines.forEach((line, i) => {
      const lineSpan = document.createElement('span');
      lineSpan.classList.add('typed-line');
      lineSpan.textContent = line;
      element.appendChild(lineSpan);
      if (i < lines.length - 1) {
        element.appendChild(document.createElement('br'));
      }
    });
  }

  private typeLines(element: HTMLElement, lines: string[], lineIdx: number, done?: () => void) {
    if (lineIdx >= lines.length) {
      if (done) done();
      return;
    }

    const lineSpan = document.createElement('span');
    lineSpan.classList.add('typed-line');
    element.appendChild(lineSpan);

    let charIdx = 0;
    const typeChar = () => {
      if (charIdx < lines[lineIdx].length) {
        lineSpan.textContent += lines[lineIdx].charAt(charIdx);
        charIdx++;
        const id = setTimeout(typeChar, 15);
        this.typingTimeouts.push(id);
      } else {
        element.appendChild(document.createElement('br'));
        const id = setTimeout(() => {
          this.typeLines(element, lines, lineIdx + 1, done);
        }, 100);
        this.typingTimeouts.push(id);
      }
    };

    typeChar();
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
    this.clearAllTimeouts();
  }
}
