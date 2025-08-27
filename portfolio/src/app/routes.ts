import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { QuizzComponent } from './pages/quizz/quizz.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Page',
  },
  {
    path: 'quizz',
    component: QuizzComponent,
    title: 'Quizz Page',
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    title: 'Projects Page',
  },
  {
    path: 'skills',
    component: SkillsComponent,
    title: 'Skills Page',
  },
];

export default routeConfig;
