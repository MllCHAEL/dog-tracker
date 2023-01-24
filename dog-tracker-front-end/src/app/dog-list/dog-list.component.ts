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

  public dogsToDelete: string[] = [];

  constructor(private http: HttpClient, public dogService: DogService) { };

  deleteDog(dog: Dog) {
    if (confirm(`Are you sure to delete this dog?: ${dog.name}`)) {
      var dogIndex = this.dogsToDelete.push(dog.id) - 1;
      // TODO: Encode dogData before appending to url (if mimicking sensitive data)
      // TODO: Add deleting indicator (e.g. swap delete icon to mat spinner)
      concat(this.dogService.deleteDog(dog), this.dogService.getDogList()).
        subscribe(dogDeleted => this.dogsToDelete.splice(dogIndex, 1));
    }
  }

  // TODO: Display indicator when table is updating (e.g. Fetching updated dogs list... above table - potentially spinner too)

}
