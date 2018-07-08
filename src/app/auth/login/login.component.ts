import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-login',
    template: `
      <section>
        <form
          fxLayout="column"
          fxLayoutAlign="center center"
          fxLayoutGap="10px"
          [formGroup]="loginForm"
          (ngSubmit)="onSubmit()">
          <mat-form-field>
            <input
              type="email"
              matInput
              placeholder="Your email"
              formControlName="email">
            <mat-hint>Please enter a valid email.</mat-hint>
            <mat-error>Invalid or missing email.</mat-error>
          </mat-form-field>
          <mat-form-field>
            <input
              type="password"
              matInput
              placeholder="Your password"
              formControlName="password">
            <mat-hint>Please enter your password.</mat-hint>
            <mat-error>Missing password.</mat-error>
          </mat-form-field>
          <button type="submit" mat-raised-button color="primary" [disabled]="loginForm.invalid">Submit</button>
        </form>
      </section>
    `,
    styles: [`
      mat-form-field {
        width: 300px;
      }
    `]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', {
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', { validators: [Validators.required] })
        });
    }

    onSubmit() {
        this.authService.login({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        });
    }
}