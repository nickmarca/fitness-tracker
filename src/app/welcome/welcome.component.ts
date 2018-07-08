import { Component } from '@angular/core';

@Component({
    selector: 'my-welcome',
    template: `
      <div class="welcome" 
           fxLayout="column" 
           fxLayout.gt-md="row" 
           fxLayoutAlign="center center" 
            fxLayoutGap.gt-md="20px">
        <section> 
          <h1>ACTIVITY</h1>
          <p>Stay active and enjoy better health and more fun!</p>
        </section>
        <section>
          <h1>COMMUNITY</h1>
          <p>Get to know other people who share your passion!</p>
        </section>
        <section>
          <h1>CHALLENGES</h1>
          <p>Never stop! Dive into new challenges every day</p>
        </section>
      </div>
    `,
    styles: [`
      .welcome {
        text-align: center;
      }
    `]
})
export class WelcomeComponent {

}