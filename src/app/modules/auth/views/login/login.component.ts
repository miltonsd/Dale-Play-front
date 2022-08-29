import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'dlp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
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
