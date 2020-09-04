import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Jesus',
    apellido: 'Valdez',
    correo: 'jdv_rodriguez@hotmail.com',
    pais: 'CRI',
    genero: 'F'
  };

  paises = [];
  constructor(private paisServer: PaisService) { }

  ngOnInit(): void {
    this.paisServer.getPaises()
    .subscribe(paises => {
      this.paises = paises;
      this.paises.unshift({
        nombre: '[Seleccione pais]',
        codigo: ''
      });
    });
  }

  // tslint:disable-next-line: typedef
  guardar(forma: NgForm){

    if (forma.invalid){
      Object.values(forma.controls).forEach(control=>{
        control.markAsTouched();
      });
      return;
    }
  }
}
