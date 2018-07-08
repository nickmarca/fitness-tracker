import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {MatDialog} from "@angular/material";
import {StopTrainingComponent} from "./stop-training.component";
import {TrainingService} from "../training.service";

@Component({
    selector: 'app-current-training',
    template: `
      <section fxLayout="column" fxLayoutAlign="center center">
        <mat-progress-spinner mode="determinate" [value]="progress"></mat-progress-spinner>
        <h1>{{ progress }} %</h1>
        <p>Keep on going, you can do it!</p>
        <button mat-raised-button color="accent" (click)="onStop()">Stop</button>
      </section>
    `,
    styles: [`
      section {
        padding: 30px;
      } 
    `]
})
export class CurrentTrainingComponent implements OnInit {
    progress = 0;
    timer: any;

     constructor(private dialog: MatDialog, private trainingService: TrainingService) {}

    ngOnInit() {
        this.startOrResumeTime();
    }

    startOrResumeTime() {
         const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
        this.timer = setInterval(() => {
            this.progress = this.progress +  1;
            if(this.progress >= 100) {
                this.trainingService.completeExercise();
                clearInterval(this.timer);
            }
        }, step);
    }

    onStop() {
        clearInterval(this.timer);
        const dialogRef = this.dialog.open(StopTrainingComponent, {data: {
            progress: this.progress
        }});

        dialogRef.afterClosed().subscribe(result => {
           if(result) {
               this.trainingService.cancelExercise(this.progress)
           }
           return this.startOrResumeTime();
        });
    }
}
