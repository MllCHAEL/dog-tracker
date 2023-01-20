import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.scss']
})

export class DogFormComponent implements OnInit {

  // TODO: Add validation for pure whitespace input (e.g. just spacebars)
  dogForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    barksALot: new FormControl(false, Validators.required)
  });
  // TODO: Display validation error messages (E.g. "Char limit (20) exceeded")

  addDog(): void {
    if (this.dogForm.valid) {
      console.log('Dog name:' + this.dogForm.controls.name.value, 'Barks a lot?', this.dogForm.controls.barksALot.value);
      this.dogForm.reset();
      this.dogForm.controls.barksALot.setValue(false);
      return
    }
    this.dogForm.reset();
    this.dogForm.controls.barksALot.setValue(false);
    console.log('Invalid dog submission. Fields have been reset. ')
  }

  ngOnInit() {
    // TODO: ngOnInit if it is never used (think it will be used though :p)
  }
}
