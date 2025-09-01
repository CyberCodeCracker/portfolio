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
  @ViewChild('typedOut', { static: false }) typedOut!: ElementRef;
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
      const element = this.typedOut.nativeElement;
      const lines = text.split('\n').filter((line: string) => line.trim() !== '');

      element.textContent = '';
      this.typeLineByLine(element, lines, 0);
    });
  }

  private typeLineByLine(element: HTMLElement, lines: string[], lineIdx: number) {
    if (lineIdx >= lines.length) return;

    const lineSpan = document.createElement('span');
    lineSpan.classList.add('typed-line', 'typing'); // Add 'typing' for cursor
    element.appendChild(lineSpan);
    element.appendChild(document.createElement('br'));

    let charIdx = 0;
    const typeChar = () => {
      if (charIdx < lines[lineIdx].length) {
        lineSpan.textContent += lines[lineIdx].charAt(charIdx);
        charIdx++;
        this.typingTimeout = setTimeout(typeChar, 15);
      } else {
        lineSpan.classList.remove('typing'); // Remove cursor
        this.typingTimeout = setTimeout(() => {
          this.typeLineByLine(element, lines, lineIdx + 1);
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