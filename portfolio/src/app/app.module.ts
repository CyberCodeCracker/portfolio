import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { TitleComponent } from './components/title/title.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavItemComponent } from './components/side-nav-item/side-nav-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavItemComponent,
    TitleComponent,
    SideNavComponent,
    SideNavItemComponent,
    FooterComponent,
    HomeComponent,
    SkillsComponent,
    ContactComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
