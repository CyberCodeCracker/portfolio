import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ContactComponent } from "./pages/contact/contact.component";

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  }, 
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Page'
  }
];

export default routeConfig;
