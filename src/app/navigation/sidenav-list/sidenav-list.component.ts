import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-sidenav-list',
    template: `
      <mat-nav-list>
        <a mat-list-item routerLink="/signup" (click)="onClose()" *ngIf="!isAuth">
          <mat-icon>face</mat-icon>
          <span class="nav-caption">Signup</span>
        </a>

        <a mat-list-item routerLink="/login" (click)="onClose()" *ngIf="!isAuth">
          <mat-icon>input</mat-icon>
          <span class="nav-caption">Login</span>
        </a>

        <a mat-list-item routerLink="/training" (click)="onClose()" *ngIf="isAuth">
          <mat-icon>fitness_center</mat-icon>
          <span class="nav-caption">Training</span>
        </a>

        <mat-list-item *ngIf="isAuth">
          <button mat-icon-button (click)="onLogout()">
            <mat-icon>eject</mat-icon>
            <span class="nav-caption">Logout</span>
          </button>
        </mat-list-item>
      </mat-nav-list>
    `,
    styles: [`        
  
      a {
        text-decoration: none;
        color: #fff;
      }

      a:hover, a:active {
        color: lightgray;
      }

      .nav-caption {
        display: inline-block;
        padding-left: 6px;
      }
    `]
})
export class SidenavListComponent implements OnInit, OnDestroy{
    @Output() closeSidenav = new EventEmitter<void>();
    isAuth: boolean;
    authSuscription: Subscription;

    constructor(private authService: AuthService){}

    ngOnInit() {
        this.authSuscription = this.authService.authChange.subscribe(authStatus => {
           this.isAuth = authStatus;
        });
    }

    ngOnDestroy() {
        this.authSuscription.unsubscribe();
    }

    onLogout() {
        this.onClose();
        this.authService.logout();
    }

    onClose() {
        this.closeSidenav.emit();
    }
}