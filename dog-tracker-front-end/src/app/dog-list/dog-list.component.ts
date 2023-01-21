import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Dog } from '../dog';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})

export class DogListComponent implements OnInit {
  public dogList!: Dog[];

  constructor(private http: HttpClient) { };

  ngOnInit() {
    this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1)).subscribe(
      dogs => this.dogList = dogs)
  };
}
