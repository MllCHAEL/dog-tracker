import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { concat } from 'rxjs';
import { NewDog } from '../dog';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.scss']
})

export class DogFormComponent {

  constructor(private http: HttpClient, private dogService: DogService) { };

  // TODO: Add validation for pure whitespace input (e.g. just spacebars)
  public dogForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    barksALot: new FormControl(false, Validators.required)
  });
  // TODO: Optionally display validation error messages (E.g. "Char limit (20) exceeded") - Can be skipped as UI limits chars

  public addDog(): void {
    if (!this.dogForm.valid) {
      this.dogForm.reset();
      this.dogForm.controls.barksALot.setValue(false);
      console.log('Invalid dog submission. Input fields have been reset. ')
      return
    }

   // Disable 'add dog' button while processing (and add loading spinner)

    var newDog: NewDog = {
      name: this.dogForm.controls.name.value || "Default",
      barksALot: this.dogForm.controls.barksALot.value || false
    };

    concat(this.dogService.addDog(newDog), this.dogService.updateDogList()).subscribe();

    this.dogForm.reset();
    this.dogForm.controls.barksALot.setValue(false);
  }
}
