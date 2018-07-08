import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
      <mat-sidenav-container>
        <mat-sidenav #sidenav role="navigation">
          <app-sidenav-list (closeSidenav)="sidenav.close()"></app-sidenav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <app-header (sideNavToggle)="sidenav.toggle()"></app-header>
          <main>
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>
      </mat-sidenav-container>
    `,
    styles: [`
      mat-sidenav-container, mat-sidenav-content, mat-sidenav {
        height: 100%;
      }

      mat-sidenav {
        width: 250px;
      }
    `]
})
export class AppComponent {
    openSidenav = false;
}