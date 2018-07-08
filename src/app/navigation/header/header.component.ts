import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-header',
    template: `
      <mat-toolbar color="primary">
        <div fxHide.gt-xs>
          <button mat-icon-button (click)="onToggleSidenav()">
            <mat-icon>menu</mat-icon>
          </button>
        </div>
        <div>
          <a routerLink="/">
            Logo
          </a>
        </div>
        <div fxFlex fxLayout fxLayoutAlign="flex-end" fxHide.xs>
          <ul fxLayout fxLayoutGap="10px" class="navigation-items">
            <li *ngIf="!isAuth"><a routerLink="/signup">Signup</a></li>
            <li *ngIf="!isAuth"><a routerLink="/login">Login</a></li>
            <li *ngIf="isAuth"><a routerLink="/training">Training</a></li>
            <li *ngIf="isAuth"><a [style.cursor]="'pointer'" (click)="onLogout()">Logout</a></li>
          </ul>
        </div>

      </mat-toolbar>
    `,
    styles: [`
      a {
        text-decoration: none;
        color: #fff;
      }

      a:hover, a:active {
        color: lightgray;
      }

      .navigation-items {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    `]
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() sideNavToggle =  new EventEmitter<void>();
    isAuth: boolean;
    authSubscription: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authSubscription = this.authService.authChange.subscribe(authStatus => {
            this.isAuth = authStatus;
        });
    }

    onToggleSidenav() {
        this.sideNavToggle.emit();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}