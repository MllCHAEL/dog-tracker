import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { concat } from 'rxjs';
import { Dog } from '../dog';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})

export class DogListComponent {

  constructor(private http: HttpClient, public dogService: DogService) { };

  deleteDog(dog: Dog) {
    // TODO: Add confirmation dialogue on delete
    // TODO: Encode dogData before appending to url (if mimicking sensitive data)
    concat(this.dogService.deleteDog(dog), this.dogService.updateDogList()).subscribe()
  }
}
