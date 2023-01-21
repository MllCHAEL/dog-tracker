import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.scss']
})

export class DogFormComponent implements OnInit {

  constructor(private http: HttpClient) { };

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

    // TODO: Return correct format of actual dogs list and convert to POST
    this.http.get('http://localhost:7071/api/AddDog').subscribe(result => console.log(result));

    console.log('Dog name:' + this.dogForm.controls.name.value, 'Barks a lot?', this.dogForm.controls.barksALot.value);
    this.dogForm.reset();
    this.dogForm.controls.barksALot.setValue(false);
  }

  ngOnInit() {
    // TODO: ngOnInit if it is never used (think it will be used though :p)
  }
}
