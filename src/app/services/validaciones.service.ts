import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }
  
  noHerrera(control: FormControl): ErrorValidate {

    if (control.value?.toLowerCase() === 'herrera'){
      return {
        noHerrera: true
      }
    }
    return null;
  }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
  
    if (!control.value){
      return Promise.resolve(null);
    }
    return new Promise((resolve,reject) =>{
      setTimeout(() => {
        if (control.value === 'RJD'){
          resolve({existe: true});
        }
        resolve(null);
      }, 3500);
    })
  }
  passIguales(pass1: string, pass2: string){
    return (formGroup: FormGroup) => {
      
      const pass1C = formGroup.controls[pass1];
      const pass2C = formGroup.controls[pass2];
      if ( pass1C.value === pass2C.value) {
        pass2C.setErrors(null);
      }else{
        pass2C.setErrors({noEsIgual: true})
      }
    }
  }
}
