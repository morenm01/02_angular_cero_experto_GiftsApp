import { query } from '@angular/animations';
import { Component} from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {


  buscar(termino: string){
      console.log("hey");
      console.log(termino);

     // document.querySelector('input').value='';
  }
}
