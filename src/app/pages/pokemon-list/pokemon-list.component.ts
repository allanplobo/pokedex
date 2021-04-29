import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { debounceTime, filter, map, mergeAll, startWith, switchMap, tap } from 'rxjs/operators';
import { PokeapiService } from './../../core/http/pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons$!: Observable<any[]>;
  search = new FormControl('');
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 20;
  pageChanged$ = new EventEmitter<number>();

  constructor(
    private pokeService: PokeapiService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = of(this.filter$(), this.ready$(), this.paged$())
      .pipe(mergeAll());
  }

  private filter$() {
    return this.search.valueChanges.pipe(
      debounceTime(400),
      tap(_ => this.currentPage = 1),
      map(name => name?.toLowerCase()),
      map(name => this.pokeService.getPokemons(name, this.currentPage, this.itemsPerPage)),
      tap(result => this.totalItems = result.totalItems),
      map(result => result.items),
      switchMap((results: any[]) => {
        if (results.length === 0) {
          return of(results);
        }
        return forkJoin(results.map(result => this.pokeService.getPokemonDetails(result.name)));
      }),
      tap(result => console.log('Filter$ return', result)));
  }

  private ready$() {
    return this.pokeService.pokemonListReady$.pipe(
      filter(v => v > 0),
      tap(_ => this.currentPage = 1),
      map(_ => this.pokeService.getPokemons('', this.currentPage, this.itemsPerPage)),
      tap(result => this.totalItems = result.totalItems),
      map(result => result.items),
      switchMap((results: any[]) =>
        forkJoin(results.map(result => this.pokeService.getPokemonDetails(result.name)))),
      tap(result => console.log('Ready$ return', result))
    );
  }

  private paged$() {
    return this.pageChanged$.pipe(
      map(page => this.pokeService.getPokemons(this.search.value, page, this.itemsPerPage)),
      tap(result => this.totalItems = result.totalItems),
      map(result => result.items),
      switchMap((results: any[]) =>
        forkJoin(results.map(result => this.pokeService.getPokemonDetails(result.name))))
    );
  }

  pageChanged($event: any) {
    console.log('pageChanged! ', $event);
    this.pageChanged$.emit($event.page);
  }

}
