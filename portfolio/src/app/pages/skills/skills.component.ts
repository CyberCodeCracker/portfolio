import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  imports: [HeaderComponent],
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

}
