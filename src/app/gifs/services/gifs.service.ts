import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  resultados: Gif[] = [];

  constructor( private http: HttpClient){

    this._historial= JSON.parse(localStorage.getItem('historial')!) || [];
    /*if(localStorage.getItem('historial')){
      this._historial= JSON.parse(localStorage.getItem('historial')!);

    }*/
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
 buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?`,{params: params})
    .subscribe((resp: SearchGifsResponse) => {
      console.log('resultados http' , resp.data);
      this.resultados= resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })



  }
}
