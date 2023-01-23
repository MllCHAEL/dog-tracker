import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Dog } from './dog';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  public dogList!: Dog[];

  constructor(private http: HttpClient) {
    this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1)).subscribe(
      updatedDogList => this.dogList = updatedDogList);
  }

  updateDogList() {
    this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1)).subscribe(
      updatedDogList => { this.dogList = updatedDogList, console.log("Dog table display updated.\n[UI updated]") })
  }

  // TODO - Delete below after it's saved in initial service commit
  // NOTE: Could use something like below to avoid subscribe in subscribe (not cleaned, or checked to work)
  //public deleteDog(dog: Dog, dogList: Dog[]): Observable<void> {
  //  this.http.delete(`http://localhost:7071/api/DeleteDog/${dog.id}`).pipe(take(1),
  //    tap(dogDeleted => console.log(`Dog '${dog.name}' deleted.\n[UI outdated]`)),
  //    concatMap(getNewDogList => this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1),
  //      tap(newDogList => { this.dogList = newDogList, console.log("Dog table display updated.\n[UI updated]") })))).subscribe();
  //}
}
