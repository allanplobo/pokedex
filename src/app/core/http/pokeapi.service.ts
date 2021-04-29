import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  pokemonListReady$ = new BehaviorSubject<number>(0);
  pokemonsList: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  init() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    this.getAllPokemons(url);
  }

  getPokemons(name: string, page: number, itemsPerPage: number) {
    const filterResult = this.pokemonsList.filter(p => !name || p.name.startsWith(name));
    return {
      items: this.paginate(page, itemsPerPage, filterResult),
      totalItems: filterResult.length
    };
  }

  private getAllPokemons(url: string): void {
    this.http.get<any>(url).pipe(take(1)).subscribe(response => {
      this.pokemonsList.push(...response.results);
      if (response.next) {
        this.getAllPokemons(response.next);
        return;
      }
      this.pokemonListReady$.next(this.pokemonsList.length);
    });
  }

  getPokemonDetails(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  public paginate<T>(page: number, size: number, list: T[]): T[] {
    const lastIndex = list.length - 1;
    const initial = size * (page - 1);
    let end = initial + size;

    if (lastIndex < initial) {
      return [];
    }

    if (lastIndex < end) {
      end = lastIndex + 1;
    }

    return list.slice(initial, end);
  }

}
