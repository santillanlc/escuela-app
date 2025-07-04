import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alumnos } from './components/alumnos/alumnos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Alumnos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'escuela-app';
}
