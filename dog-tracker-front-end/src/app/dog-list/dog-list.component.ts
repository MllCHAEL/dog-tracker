import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
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
    // TODO: Update post to a delete (alongside AzFn)
    // TODO: Encode dogData before appending to url
    this.http.delete(`http://localhost:7071/api/DeleteDog/${dogData.id}`).subscribe(result => {
      console.log(`Dog '${dogData.name}' deleted.\nRequest details: `, result), this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1)).subscribe(
        newDogList => this.dogList = newDogList)
    });
  }

  ngOnInit() {
    this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1)).subscribe(
      dogs => this.dogList = dogs)
  }
}
