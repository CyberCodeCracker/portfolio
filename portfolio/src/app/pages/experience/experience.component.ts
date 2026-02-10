import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  icon: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  experiences: ExperienceItem[] = [
    {
      period: 'Jul 2024 – Sep 2024',
      role: 'Full Stack Developer Intern',
      company: 'TechVision Solutions',
      location: 'Sfax, Tunisia',
      description: 'Developed a management web application (Showroom) handling stock, client records, user administration, and sales history. Built with Angular on the frontend and .NET on the backend with SQL Server. Implemented JWT-based authentication and role-based access control.',
      technologies: ['Angular', '.NET', 'SQL Server', 'JWT', 'REST API'],
      icon: 'fas fa-laptop-code'
    },
    {
      period: 'Feb 2024 – May 2024',
      role: 'Backend Developer Intern',
      company: 'Digital Factory',
      location: 'Tunis, Tunisia',
      description: 'Contributed to the development of a microservices architecture using Spring Boot. Designed and implemented RESTful APIs, integrated RabbitMQ for async messaging, and deployed services using Docker and Kubernetes on AWS.',
      technologies: ['Spring Boot', 'Docker', 'Kubernetes', 'AWS', 'RabbitMQ'],
      icon: 'fas fa-server'
    },
    {
      period: 'Jun 2023 – Aug 2023',
      role: 'Web Developer Intern',
      company: 'CodeCraft Agency',
      location: 'Sfax, Tunisia',
      description: 'Built responsive web interfaces using Angular and Bootstrap. Collaborated with a team of designers to translate Figma mockups into pixel-perfect components. Implemented CI/CD pipelines using GitHub Actions.',
      technologies: ['Angular', 'Bootstrap', 'GitHub Actions', 'Figma', 'SCSS'],
      icon: 'fas fa-paint-brush'
    }
  ];
}
