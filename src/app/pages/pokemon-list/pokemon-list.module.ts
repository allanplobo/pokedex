import { PokemonListRoutingModule } from './pokemon-list.routing';
import { TopbarModule } from './../../components/topbar/topbar.module';
import { PokemonListComponent } from './pokemon-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TopbarModule,
    PokemonListRoutingModule
  ]
})
export class PokemonListModule { }
