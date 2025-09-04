// quiz.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questionsSubject = new BehaviorSubject<QuizQuestion[]>([]);
  questions$: Observable<QuizQuestion[]> = this.questionsSubject.asObservable();
  private langChangeSubscription!: Subscription;

  constructor(private translate: TranslateService) {
    this.loadQuestions();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadQuestions();
    });
  }

  private loadQuestions(): void {
    this.translate.get('QUIZ.QUESTIONS').subscribe((questions: QuizQuestion[]) => {
      this.questionsSubject.next(questions);
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}