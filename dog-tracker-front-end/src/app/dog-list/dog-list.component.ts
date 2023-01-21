import { Component, OnInit } from '@angular/core';
import { Dog } from '../dog';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})

export class DogListComponent implements OnInit {
  public dogs: Dog[] = [];

  ngOnInit() {
    this.dogs = [{ id: 1, name: 'Bear', barksALot: true },
    { id: 2, name: 'Jazzie', barksALot: false },
    { id: 5, name: 'Barkley', barksALot: true },
    { id: 3, name: 'Roofas', barksALot: true },
    { id: 4, name: 'Woofred', barksALot: false }];
  }
}
