import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routeConfig: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Souhail Amouri',
  },
  { path: '**', redirectTo: '' }
];

export default routeConfig;
