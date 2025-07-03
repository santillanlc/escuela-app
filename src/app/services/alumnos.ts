import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alumno{
  id?: number;
  nombre: string;
  edad: number;
  sexo: number;
  curp: string;
  numero_control: string;
}

@Injectable({
  providedIn: 'root'
})

export class Alumnos {

  private apiUrl: string = "http://192.168.1.21:3000/alumnos";

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  getAlumno(id: number): Observable<Alumno>{
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`)
  }

  crearAlumno(alumno: Alumno): Observable<Alumno>{
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  actualizarAlumno(id: number, alumno: Alumno): Observable<Alumno>{
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno);
  }

  eliminarAlumno(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
