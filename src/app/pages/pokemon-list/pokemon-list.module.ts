import { CardModule } from './../../components/card/card.module';
import { PokemonListRoutingModule } from './pokemon-list.routing';
import { TopbarModule } from './../../components/topbar/topbar.module';
import { PokemonListComponent } from './pokemon-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TopbarModule,
    CardModule,
    PokemonListRoutingModule,
    PaginationModule,
    FormsModule
  ]
})
export class PokemonListModule { }
