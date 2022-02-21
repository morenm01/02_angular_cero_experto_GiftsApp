import { Injectable } from '@angular/core';

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

  async buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    const resp = await fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=HNg6Vx4eB7zkeRBdxR5zwPe28iYsh6pR&q=dragon+ball+z&limit=10'
    );
    const data = await resp.json();
    console.log(data);

    console.log(this._historial);
  }
}
