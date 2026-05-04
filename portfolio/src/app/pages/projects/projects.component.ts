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
  activeImageIndex = 0;
  enlargedImage: string | null = null;

  constructor(private projectService: ProjectService) {
    this.subscription = this.projectService.projects$.subscribe((projects) => {
      this.projects = projects;
    });
  }

  openProject(project: Project) {
    this.selectedProject = project;
    this.activeImageIndex = 0;
    this.enlargedImage = null;
    this.showDialog = true;
    document.body.style.overflow = 'hidden';
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedProject = null;
    this.activeImageIndex = 0;
    this.enlargedImage = null;
    document.body.style.overflow = '';
  }

  getGalleryImages(project: Project): string[] {
    return project.IMAGE_GALLERY?.length ? project.IMAGE_GALLERY : [project.IMAGE_URL];
  }

  getGalleryCaption(project: Project, index: number): string {
    const caption = project.IMAGE_CAPTIONS?.[index];
    if (caption) {
      return caption;
    }

    const image = this.getGalleryImages(project)[index] || project.IMAGE_URL;
    const fileName = image.split('/').pop()?.split('.')[0] || project.TITLE;
    return fileName.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  hasEvenProjectCount(): boolean {
    return this.projects.length > 0 && this.projects.length % 2 === 0;
  }

  selectImage(index: number): void {
    this.activeImageIndex = index;
  }

  previousImage(): void {
    if (!this.selectedProject) {
      return;
    }

    const imageCount = this.getGalleryImages(this.selectedProject).length;
    this.activeImageIndex = (this.activeImageIndex - 1 + imageCount) % imageCount;
  }

  nextImage(): void {
    if (!this.selectedProject) {
      return;
    }

    const imageCount = this.getGalleryImages(this.selectedProject).length;
    this.activeImageIndex = (this.activeImageIndex + 1) % imageCount;
  }

  openImagePreview(image: string): void {
    this.enlargedImage = image;
  }

  closeImagePreview(): void {
    this.enlargedImage = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
