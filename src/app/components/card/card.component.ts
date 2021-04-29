import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() image!: string;
  @Input() name!: string;
  @Input() url!: string;
  favorite!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.favorite = true;
  }

  setFavorite(value: boolean) {
    this.favorite = value;
  }

}
