import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <mat-sidenav-container>
          <mat-sidenav #sidenav role="navigation">
            <p>I'm the sidenav</p>
          </mat-sidenav>
          <mat-sidenav-content>
            <router-outlet></router-outlet>
          </mat-sidenav-content>
        </mat-sidenav-container>
    `
})
export class AppComponent {
    openSidenav = false;
}