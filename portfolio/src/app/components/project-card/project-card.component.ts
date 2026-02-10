// project-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() projectTitle!: string;
  @Input() projectImageUrl!: string;
  @Input() projectShortDescription!: string;
  @Input() projectUrl!: string;
  @Input() projectDescription: string = '';
  @Input() projectVideoUrl: string = '';

  @Output() viewProject = new EventEmitter<void>();

  showVideo = false;

  openDialog() {
    this.viewProject.emit();
  }

  toggleVideo() {
    this.showVideo = !this.showVideo;
  }
}