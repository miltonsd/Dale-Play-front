import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'dlp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  hide = true;

  constructor() {}

  ngOnInit(): void {
    console.log(this.form.value);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
    }
  }
}
