import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../../pages/home/home.component';
import { ProjectsComponent } from '../../pages/projects/projects.component';
import { EducationComponent } from '../../pages/education/education.component';
import { ExperienceComponent } from '../../pages/experience/experience.component';
import { ContactComponent } from '../../pages/contact/contact.component';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProjectsComponent,
    EducationComponent,
    ExperienceComponent,
    ContactComponent,
    RevealDirective
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements AfterViewInit, OnDestroy {
  showBackToTop = false;

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll = () => {
    this.showBackToTop = window.scrollY > 400;
  };

  scrollToTop(): void {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
