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

  public addingDog: boolean = false;

  constructor(private http: HttpClient, private dogService: DogService) { };

  // TODO: Increase validation (e.g. for pure whitespace input - just spacebars, odd characters - @, etc.)
  public dogForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    barksALot: new FormControl(false, Validators.required)
  });
  // TODO: Optionally display validation error messages (E.g. "Char limit (20) exceeded" - Can be skipped as UI limits chars)

  public addDog(): void {
    if (!this.dogForm.valid) {
      this.dogForm.reset();
      this.dogForm.controls.barksALot.setValue(false);
      console.log('Invalid dog submission. Input fields have been reset. ')
      return
    }
    this.addingDog = true;
    this.dogForm.disable();
    // TODO: Loading spinner being displayed should not cause existing checkbox and 'add dog' button to shift horizontally

    var newDog: NewDog = {
      name: this.dogForm.controls.name.value!,
      barksALot: this.dogForm.controls.barksALot.value!
    };

    // TODO: Inputs should be disabled (with spinner) until dog table updates and the newly added dog is visible
    concat(this.dogService.addDog(newDog), this.dogService.getDogList()).subscribe(result => {
      this.addingDog = false;
      this.dogForm.enable()
    });

    this.dogForm.reset();
    this.dogForm.controls.barksALot.setValue(false);
  }
}
