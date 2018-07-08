import {Component, OnInit} from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import {TrainingService} from "./training.service";

@Component({
    selector: 'app-training',
    template: `        
        <mat-tab-group *ngIf="!onGoingTrainig">
          <mat-tab label="New Exercise">
            <app-new-training></app-new-training>
          </mat-tab>
          <mat-tab label="Past Exercise">
            <app-past-training></app-past-training>
          </mat-tab>
        </mat-tab-group>
        <app-current-training *ngIf="onGoingTrainig"></app-current-training>
    `
})
export class TrainingComponent implements OnInit{
    onGoingTrainig = false;
    exerciseSubscrition: Subscription;

    constructor(private trainingService: TrainingService) {}

    ngOnInit() {
        this.exerciseSubscrition = this.trainingService.exerciseChanged.subscribe(exercise => {
            if(exercise) {
                return this.onGoingTrainig = true;
            }
            this.onGoingTrainig = false;
        });
    }
}