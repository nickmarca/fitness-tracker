import {Component, OnInit} from "@angular/core";
import {TrainingService} from "../training.service";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-new-training',
    template: `
      <section fxLayout fxLayoutAlign="center">
        <form (ngSubmit)="onStartTraining(f)" #f="ngForm">
          <mat-card fxFlex="400px" fxFlex.xs="100%">
            <mat-card-title fxLayoutAlign="center">Time to start a workout!</mat-card-title>
            <mat-card-content fxLayoutAlign="center">
              <mat-form-field>
                <mat-select placeholder="Choose Exercise" ngModel name="exercise" required>
                  <mat-option *ngFor="let exercise of trainingExercises" [value]="exercise.id">
                    {{exercise.name}}
                  </mat-option>
                </mat-select>
              </mat-form-field>


            </mat-card-content>
            <mat-card-actions fxLayoutAlign="center">
              <button type="submit" mat-button [disabled]="f.invalid">Start</button>
            </mat-card-actions>
          </mat-card>
        </form>
      </section>
    `,
    styles: [`
      section {
        padding: 30px;
      }
    `]
})
export class NewTrainingComponent implements OnInit {
    trainingExercises: Exercise[] = [];

    constructor(private trainingService: TrainingService) {
    }

    ngOnInit() {
        this.trainingExercises = this.trainingService.getAvailableExercises();
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }
}