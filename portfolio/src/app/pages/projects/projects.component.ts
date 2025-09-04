// projects.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProjectCardComponent } from 'src/app/components/project-card/project-card.component';
import { Project, ProjectService } from 'src/app/services/project.service';

@Component({
  standalone: true,
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [CommonModule, HeaderComponent, TranslateModule, ProjectCardComponent]
})
export class ProjectsComponent implements OnDestroy {
  projects: Project[] = [];
  private subscription: Subscription;

  showDialog = false;
  selectedProject: Project | null = null;

  constructor(private projectService: ProjectService) {
    this.subscription = this.projectService.projects$.subscribe((projects) => {
      this.projects = projects;
    });
  }

  openProject(project: Project) {
    this.selectedProject = project;
    this.showDialog = true;
    // optional: prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}