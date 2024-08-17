import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Página Inicial';
  tasks = signal(["Estudiar Angular", "Hacer una app", "Publicarla", "Compartirla", "Hacer un curso"
  ]);
}
