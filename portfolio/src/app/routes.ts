import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { EducationComponent } from './pages/education/education.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MainComponent } from './components/main/main.component';

const routeConfig: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home — Souhail Amouri',
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        title: 'Projects — Souhail Amouri',
      },
      {
        path: 'education',
        component: EducationComponent,
        title: 'Education & Certifications — Souhail Amouri',
      },
      {
        path: 'experience',
        component: ExperienceComponent,
        title: 'Experience — Souhail Amouri',
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact — Souhail Amouri',
      },
      {
        path: 'quiz',
        component: QuizComponent,
        title: 'Quiz — Souhail Amouri',
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ],
  },
  { path: '**', redirectTo: '/home' }
];

export default routeConfig;
