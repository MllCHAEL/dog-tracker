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
      dogList => this.dogList = dogList);
  }

  // TODO: Specify type instead of any
  getDogList(): Observable<any> {
    return this.http.get<Dog[]>('http://localhost:7071/api/GetDogs')
      .pipe(take(1),
        tap(updatedDogList => {
          this.dogList = updatedDogList;
          console.log("Display table data updated.");
        }));
  }

  // TODO: Specify type instead of any
  deleteDog(dog: Dog): Observable<any> {
    return this.http.delete(`http://localhost:7071/api/DeleteDog/${dog.id}`)
      .pipe(take(1),
        tap(dogDeleted => {
          var deleteUIDogIndex = this.dogList.indexOf(dog);
          this.dogList.splice(deleteUIDogIndex, 1);
          console.log(`Dog '${dog.name}' deleted.`);
          // TODO: Resolve bug when adding dogA and deleting dogB while dogA is still 'Fetching id' (wrong dog [dogA] appears deleted until refresh - subsequent flow-on effects on UI)
        }));

  }
  // TODO: Specify type instead of any
  addDog(newDog: NewDog): Observable<any> {
    return this.http.post('http://localhost:7071/api/AddDog', newDog).pipe(take(1), tap(
      dogAdded => {
        console.log(`New dog '${newDog.name}' added. Updating table data.`);
        // This dog is not deletable until its Id is overridden via getDogs()
        // TODO: Try make below more concise
        var tempDog: Dog = {
          id: 'Fetching id...',
          name: newDog.name,
          barksALot: newDog.barksALot
        };
        this.dogList.push(tempDog);
      }));
  }
}
