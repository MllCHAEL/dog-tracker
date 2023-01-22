import { Component } from '@angular/core';
import { Dog } from './dog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  updatedDogList!: Dog[];

  updateDogList($event: Dog[]) {
    this.updatedDogList = $event;
  }
}
