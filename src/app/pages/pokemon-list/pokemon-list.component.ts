import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeAll, switchMap, tap } from 'rxjs/operators';
import { PokeapiService } from './../../core/http/pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  pokemons$!: Observable<any[]>;
  search = new FormControl('');

  constructor(
    private pokeService: PokeapiService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = of(this.init$(), this.filter$()).pipe(mergeAll());

    // this.pokeService.getPokemons()
    //   .subscribe((response: any) => {
    //     console.log('pokeApi return', response);
    //     response.results.forEach((pokemon: any) => {
    //       this.pokeService.getPokemonDetails(pokemon.name)
    //         .subscribe((element: any) => {
    //           this.pokemons.push(element);
    //         });
    //     });
    //     console.log(this.pokemons);
    //   });
  }

  private init$() {
    return this.pokeService.getPokemons().pipe(
      map((response: any) => response.results),
      switchMap((results: any[]) =>
        forkJoin(results.map(result => this.pokeService.getPokemonDetails(result.name)))),
      tap(results => this.pokemons = results));
  }

  private filter$() {
    return this.search.valueChanges.pipe(
      map(value => this.pokemons.filter(p => p.species.name.indexOf(value) >= 0)));
  }

}
