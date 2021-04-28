import { PokeapiService } from './../../core/http/pokeapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];

  constructor(
    private pokeService: PokeapiService
  ) { }

  ngOnInit(): void {
    this.pokeService.getPokemons()
      .subscribe((response: any) => {
        // console.log('pokeApi return', response);
        response.results.forEach((pokemon: any) => {
          this.pokeService.getPokemonDetails(pokemon.name)
            .subscribe((element: any) => {
              this.pokemons.push(element);
            });
        });
        console.log(this.pokemons);
      });
  }

}
