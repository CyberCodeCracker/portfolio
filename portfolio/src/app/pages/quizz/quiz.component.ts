// quiz.component.ts
import { Component, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizQuestion, QuizService } from 'src/app/services/quiz.service';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, HeaderComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnDestroy {
  questions: QuizQuestion[] = [];
  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  score = 0;
  quizCompleted = false;
  showFeedback = false;
  isCorrect = false;
  showHappyAnimation = false;
  private subscription: Subscription;

  constructor(private quizService: QuizService, private translate: TranslateService) {
    this.subscription = this.quizService.questions$.subscribe((questions) => {
      this.questions = questions;
    });
    this.translate.onLangChange.subscribe(() => {
      this.resetQuiz();
    });
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

submitAnswer(): void {
    if (!this.selectedAnswer) return;

    this.showFeedback = true;
    this.isCorrect = this.selectedAnswer === this.questions[this.currentQuestionIndex].correct_answer;
    if (this.isCorrect) {
      this.score++;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      setTimeout(() => {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
        this.showFeedback = false;
      }, 3000); 
    } else {
      this.quizCompleted = true;
      this.showHappyAnimation = this.score >= 7;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = null;
      this.showFeedback = false;
    }
  }

  resetQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.quizCompleted = false;
    this.showFeedback = false;
    this.isCorrect = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}