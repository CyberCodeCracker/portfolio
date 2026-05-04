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
  private typingTimeouts: ReturnType<typeof setTimeout>[] = [];
  // Checked once per session — true only on the very first page load
  private showTypingOnce: boolean = !sessionStorage.getItem('portfolio_visited');

  constructor(private translate: TranslateService) {}

  ngAfterViewInit(): void {
    // APP_INITIALIZER already loaded translations before any component rendered,
    // so translate.get() resolves from cache here — no async race possible.
    this.renderText();

    // Only fires when the user actively switches language via the menu.
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.clearAllTimeouts();
      this.renderText();
    });
  }

  private clearAllTimeouts(): void {
    for (const id of this.typingTimeouts) clearTimeout(id);
    this.typingTimeouts = [];
  }

  private renderText(): void {
    // Consume the flag synchronously so concurrent calls can't both see true.
    const doTyping = this.showTypingOnce;
    if (doTyping) {
      this.showTypingOnce = false;
      sessionStorage.setItem('portfolio_visited', 'true');
    }

    this.translate.get('ABOUT').subscribe((text: string) => {
      const introEl: HTMLElement = this.typedIntro.nativeElement;
      const restEl: HTMLElement  = this.typedRest.nativeElement;

      const lines = text
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter((l: string) => l.trim() !== '');

      const introLines = lines.slice(0, 2);
      const restLines  = lines.slice(2);

      introEl.textContent = '';
      restEl.textContent  = '';
      introEl.classList.remove('slide-in');
      restEl.classList.remove('slide-in');

      if (doTyping) {
        this.typeLines(introEl, introLines, 0, () => {
          this.typeLines(restEl, restLines, 0);
        });
      } else {
        this.renderInstant(introEl, introLines);
        this.renderInstant(restEl, restLines);
        void introEl.offsetWidth; // force reflow so CSS animation fires
        introEl.classList.add('slide-in');
        restEl.classList.add('slide-in');
      }
    });
  }

  private renderInstant(element: HTMLElement, lines: string[]): void {
    lines.forEach((line, i) => {
      const span = document.createElement('span');
      span.classList.add('typed-line');
      span.textContent = line;
      element.appendChild(span);
      if (i < lines.length - 1) element.appendChild(document.createElement('br'));
    });
  }

  private typeLines(
    element: HTMLElement,
    lines: string[],
    lineIdx: number,
    done?: () => void
  ): void {
    if (lineIdx >= lines.length) { if (done) done(); return; }

    const lineSpan = document.createElement('span');
    lineSpan.classList.add('typed-line');
    element.appendChild(lineSpan);

    let charIdx = 0;
    const typeChar = () => {
      if (charIdx < lines[lineIdx].length) {
        lineSpan.textContent += lines[lineIdx].charAt(charIdx++);
        this.typingTimeouts.push(setTimeout(typeChar, 15));
      } else {
        element.appendChild(document.createElement('br'));
        this.typingTimeouts.push(
          setTimeout(() => this.typeLines(element, lines, lineIdx + 1, done), 100)
        );
      }
    };
    typeChar();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
    this.clearAllTimeouts();
  }
}
