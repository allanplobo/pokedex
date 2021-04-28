import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemons() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon');
  }

  getPokemonDetails(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

}
