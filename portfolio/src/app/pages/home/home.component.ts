import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [HeaderComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Home component initialized');
  }

}
