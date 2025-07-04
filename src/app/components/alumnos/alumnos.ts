import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlumnosService, Alumno } from '../../services/alumnos';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, FormsModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class Alumnos implements OnInit  {
  alumnos: Alumno[] = [];
  alumnoSeleccionado: Alumno | null = null;
  modoEditar = false;

  constructor(private alumnosService: AlumnosService) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnosService.getAlumnos().subscribe(data => {
      this.alumnos = data;
    });
  }

  seleccionarAlumno(alumno: Alumno) {
    this.alumnoSeleccionado = { ...alumno };
    this.modoEditar = true;
  }

  eliminarAlumno(id: number) {
    if (confirm('¿Seguro que quieres eliminar este alumno?')) {
      this.alumnosService.eliminarAlumno(id).subscribe(() => {
        this.cargarAlumnos();
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) return;

    if (this.modoEditar && this.alumnoSeleccionado?.id) {
      this.alumnosService
        .actualizarAlumno(this.alumnoSeleccionado.id, this.alumnoSeleccionado)
        .subscribe(() => {
          this.cargarAlumnos();
          this.resetForm(form);
        });
    } else {
      this.alumnosService.crearAlumno(this.alumnoSeleccionado!).subscribe(() => {
        this.cargarAlumnos();
        this.resetForm(form);
      });
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    //this.alumnoSeleccionado = null;
    this.modoEditar = false;
  }

  nuevoAlumno() {
    this.alumnoSeleccionado = {
      nombre: '',
      edad: 0,
      sexo: 1,
      curp: '',
      numero_control: ''
    };
    this.modoEditar = false;
  }
}
