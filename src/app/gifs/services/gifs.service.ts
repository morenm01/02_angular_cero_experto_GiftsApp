import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/search-gifs-response';

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

  resultados: Gif[] = [];

  constructor( private http: HttpClient){


    if(localStorage.getItem('historial')){
      this._historial= JSON.parse(localStorage.getItem('historial')!);

      console.log( this._historial);
    }
  }
 buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=HNg6Vx4eB7zkeRBdxR5zwPe28iYsh6pR&q=${query}&limit=10`)
    .subscribe((resp: SearchGifsResponse) => {
      console.log('resultados http' , resp.data);
      this.resultados= resp.data;
    })



  }
}
