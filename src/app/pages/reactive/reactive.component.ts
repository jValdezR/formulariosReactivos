import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidacionesService } from '../../services/validaciones.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;


  constructor(private fb: FormBuilder,
    private validador: ValidacionesService) {

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {

  }
  // tslint:disable-next-line: typedef
  NoValido(palabra: string) {
    return this.forma.get(palabra).invalid && this.forma.get(palabra).touched;
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get comparacion() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

  // tslint:disable-next-line: typedef
  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validador.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validador.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([
      ]),
    },
      {
        validators: this.validador.passIguales('pass1', 'pass2')
      });

  }

  crearListeners(){
    // Para estar pendiente de cada cambio en los campos del formulario

    // this.forma.valueChanges.subscribe(valor => {
    //   console.log(valor);
    // });

    // Para estar pendiente de cada cambio del estado
    // this.forma.statusChanges.subscribe(valor => {
    //   console.log(valor);
    // });

    // Para ver los cambios en determinado cambio que sea de interes.
    this.forma.get('nombre').valueChanges.subscribe(valor => {
      console.log(valor);
    });
  }

  cargarDataAlFormulario() {
    // this.forma.setValue
    this.forma.reset({// Todos los campos son obligatorios con setValue, opcionales con reset
      nombre: 'Juanito',
      apellido: 'Perez',
      correo: 'juan@gmail.com',
      direccion: {
        distrito: 'Ontario',
        ciudad: 'Ottawa'
      },
    });
  }

  guardar(): void {
    console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {// Validacion a sub grupos
          Object.values(control.controls).forEach(controle => controle.markAsTouched());
        }
        else {
          control.markAsTouched();
        }

      });
    }
    // Posteo de la info, reset a los campos
    this.forma.reset({// No es necesario llenar con todos los campos
      nombre: 'Sin nombre'
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }
  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }
}
