import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { Dog } from '../dog';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})

export class DogListComponent {

  constructor(private http: HttpClient, public dogService: DogService) { };

  deleteDog(dogData: Dog) {
    // TODO: Encode dogData before appending to url
    this.http.delete(`http://localhost:7071/api/DeleteDog/${dogData.id}`).pipe(take(1)).subscribe(
      logDeleteAndUpdateDogList => {
        console.log(`Dog '${dogData.name}' deleted.\n[UI outdated]`),
          this.dogService.updateDogList()
      })
  }
}
