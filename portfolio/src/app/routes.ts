import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { MainComponent } from './components/main/main.component';

const routeConfig: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home Page',
      },
      {
        path: 'quiz',
        component: QuizComponent,
        title: 'Quiz Page',
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        title: 'Projects Page',
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
