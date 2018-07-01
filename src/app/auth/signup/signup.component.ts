import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-signup',
    template: `        
        <section class="signup-form">
          <form fxLayout="column" fxLayoutAlign="center center" #f="ngForm" fxLayoutGap="15px" (ngSubmit)="onSubmit(f)">
            <mat-form-field>
              <input type="email" 
                     matInput 
                     placeholder="Your email"
                     required
                     email
                     #emailInput="ngModel"
                     ngModel name="email" >
              <mat-error *ngIf="!emailInput.hasError('required')">E-mail is invalid</mat-error>
              <mat-error *ngIf="emailInput.hasError('required')">Field must not be empty</mat-error>
            </mat-form-field>
            <mat-form-field hintLabel="Should be at least 6 characters long.">
              <input type="password" 
                     matInput 
                     placeholder="Your password" 
                     ngModel 
                     required
                     minlength="6"
                     #pwInput="ngModel"
                     name="password">
              <mat-hint align="end">{{ pwInput.value?.length }} / 6 </mat-hint>
            </mat-form-field>
            <mat-form-field>
              <input matInput
                     name="birthdate"
                     required
                     ngModel
                     placeholder="Your birthdate" 
                     [matDatepicker]="picker" 
                     [max]="maxDate">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
            <mat-checkbox ngModel name="agree" required color="primary">Agree to Terms and Conditions.</mat-checkbox>
            <button type="submit" mat-raised-button color="primary" [disabled]="f.invalid">Submit</button>
          </form>
        </section>
    `,
    styles: [`
      mat-form-field {
        width: 300px;
      }
    `]
})
export class SignupComponent {
    maxDate: Date;

    ngOnInit() {
        this.maxDate = new Date;
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }

    onSubmit(form: NgForm) {
        console.log(form);
    }
}