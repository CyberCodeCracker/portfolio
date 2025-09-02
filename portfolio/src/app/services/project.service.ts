import { Inject, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

export interface Project {
  TITLE: string;
  IMAGE_URL: string;
  SHORT_DESCRIPTION: string
  DESCRIPTION: string;
  PROJECT_URL: string;
} 

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projects$: Observable<Project[]> = this.projectsSubject.asObservable();
  private langChangeSubscription!: Subscription;

  constructor(private translate: TranslateService) {
    this.loadProjects();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadProjects();
    });
  }

  private loadProjects(): void {
    this.translate.get('PROJECTS_LIST').subscribe((projects: Project[]) => {
      this.projectsSubject.next(projects);
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}