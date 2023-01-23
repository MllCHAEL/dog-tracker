import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
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
      console.log('Invalid dog submission. Fields have been reset. ')
      return
    }

    // TODO: Disable button while processing

    // TODO: Determine if keeping/desirable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var newDog = {
      "name": this.dogForm.controls.name.value,
      "barksALot": this.dogForm.controls.barksALot.value
    };

    this.http.post('http://localhost:7071/api/AddDog', newDog, httpOptions).pipe(take(1)).subscribe(
      logAddAndUpdateDogList => {
        console.log(`New dog '${newDog.name}' added.\n[UI outdated]`),
          this.dogService.updateDogList()
      });

    this.dogForm.reset();
    this.dogForm.controls.barksALot.setValue(false);
  }
}
