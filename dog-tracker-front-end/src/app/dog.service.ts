import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Dog, NewDog } from './dog';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  public dogList!: Dog[];

  constructor(private http: HttpClient) {
    this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1)).subscribe(
      updatedDogList => this.dogList = updatedDogList);
  }

  // TODO: Specify type instead of any
  updateDogList(): Observable<any> {
    return this.http.get<Dog[]>('http://localhost:7071/api/GetDogs').pipe(take(1), tap(
      updatedDogList => { this.dogList = updatedDogList, console.log("Dog table display updated.\n[UI updated]") }))
  }

  // TODO: Specify type instead of any
  deleteDog(dog: Dog): Observable<any> {
    return this.http.delete(`http://localhost:7071/api/DeleteDog/${dog.id}`).pipe(take(1), tap(
      dogDeleted => console.log(`Dog '${dog.name}' deleted.\n[UI outdated]`)))

  }
  // TODO: Specify type instead of any
  addDog(newDog: NewDog): Observable<any> {
    return this.http.post('http://localhost:7071/api/AddDog', newDog).pipe(take(1), tap(
      dogAdded => console.log(`New dog '${newDog.name}' added.\n[UI outdated]`)))
  }
}
