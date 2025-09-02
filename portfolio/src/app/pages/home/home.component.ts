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
  private typingTimeout: any;

  constructor(private translate: TranslateService) {}

  ngAfterViewInit(): void {
    this.setupTypingAnimation();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.setupTypingAnimation();
    });
  }

  private setupTypingAnimation(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    this.translate.get('ABOUT').subscribe((text: string) => {
      const introEl: HTMLElement = this.typedIntro.nativeElement;
      const restEl: HTMLElement = this.typedRest.nativeElement;

      const lines = text
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter((line: string) => line.trim() !== '');

      const introLines = lines.slice(0, 2);
      const restLines = lines.slice(2);

      introEl.textContent = '';
      restEl.textContent = '';

      this.typeLines(introEl, introLines, 0, () => {
        this.typeLines(restEl, restLines, 0);
      });
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
        this.typingTimeout = setTimeout(typeChar, 15);
      } else {
        element.appendChild(document.createElement('br'));
        this.typingTimeout = setTimeout(() => {
          this.typeLines(element, lines, lineIdx + 1, done);
        }, 100);
      }
    };

    typeChar();
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }
}