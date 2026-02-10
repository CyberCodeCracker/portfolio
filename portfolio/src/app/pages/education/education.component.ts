import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'certification';
  icon: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  timelineItems: TimelineItem[] = [
    {
      year: '2023 – 2025',
      title: 'Engineering Degree in Computer Science',
      institution: 'ENET\'COM — National School of Electronics and Telecommunications',
      description: 'Specialization in software engineering, web applications, distributed systems, and cloud computing. Focus on Angular, Spring Boot, .NET, and DevOps practices.',
      type: 'education',
      icon: 'fas fa-university'
    },
    {
      year: '2020 – 2023',
      title: 'Bachelor\'s Degree in Computer Science',
      institution: 'Faculty of Sciences — University of Sfax',
      description: 'Foundation in algorithms, data structures, object-oriented programming, databases, and networking. Projects in Java, Python, and C.',
      type: 'education',
      icon: 'fas fa-graduation-cap'
    },
    {
      year: '2024',
      title: 'AWS Certified Cloud Practitioner',
      institution: 'Amazon Web Services (AWS)',
      description: 'Validated understanding of AWS cloud concepts, core services, security, architecture, and pricing. Credential ID: XXXXXXXX',
      type: 'certification',
      icon: 'fab fa-aws'
    },
    {
      year: '2024',
      title: 'Angular — The Complete Guide',
      institution: 'Udemy — Maximilian Schwarzmüller',
      description: 'Comprehensive course covering Angular fundamentals, RxJS, NgRx, routing, forms, HTTP, testing, and deployment best practices.',
      type: 'certification',
      icon: 'fab fa-angular'
    },
    {
      year: '2023',
      title: 'Docker & Kubernetes: The Practical Guide',
      institution: 'Udemy — Maximilian Schwarzmüller',
      description: 'Hands-on training with Docker containers, Docker Compose, Kubernetes orchestration, deployments, services, and volumes.',
      type: 'certification',
      icon: 'fab fa-docker'
    },
    {
      year: '2020',
      title: 'Baccalaureate in Experimental Sciences',
      institution: 'High School — Tunisia',
      description: 'Successfully completed the national baccalaureate examination with distinction in mathematics and physics.',
      type: 'education',
      icon: 'fas fa-school'
    }
  ];
}
