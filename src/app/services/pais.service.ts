import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(map((mapa: any[]) => {
      return mapa.map( pais => {
        return {
          nombre: pais.name,
          cod: pais.alpha3Code
        };
      });
    }));
  }
}
