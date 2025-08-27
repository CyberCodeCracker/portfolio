import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  imports: [HeaderComponent],
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

}
