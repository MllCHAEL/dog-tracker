import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { concatMap, take, tap } from 'rxjs/operators';
import { Dog } from '../dog';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})

export class DogListComponent implements OnInit {
  @Input() dogList!: Dog[];

  constructor(private http: HttpClient) { };

  deleteDog(dogData: Dog) {
    // TODO: Encode dogData before appending to url
    this.http.delete(`http://localhost:7071/api/DeleteDog/${dogData.id}`).pipe(take(1),
      tap(dogDeleted => console.log(`Dog '${dogData.name}' deleted`)),
      concatMap(getNewDogList => this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1),
        tap(newDogList => this.dogList = newDogList)))).subscribe();
  }

  ngOnInit() {
    this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1)).subscribe(
      dogs => this.dogList = dogs)
  }
}
