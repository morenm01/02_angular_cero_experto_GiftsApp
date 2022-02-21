import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  /*CREAMOS LA API KEY DESDE LA PÁGINA
  https://developers.giphy.com/dashboard/

  En Docs - Giphy API - search endpoints
  podemos encontrar la url necesaria y los parámetros para hacer la llamada
  api.giphy.com/v1/gifs/search
  */
  private apiKey: string = 'HNg6Vx4eB7zkeRBdxR5zwPe28iYsh6pR';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient){

  }
 buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=HNg6Vx4eB7zkeRBdxR5zwPe28iYsh6pR&q=dragon+ball+z&limit=10')
    .subscribe((resp:any) => {
      console.log(resp.data);
    })


    console.log(this._historial);
  }
}
