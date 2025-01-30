import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-expert-04';

  isRunningInBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isRunningInBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isRunningInBrowser) {
      console.log('Running in browser!');
      localStorage.setItem('name', 'Angular Expert');
    } else {
      console.log('Running on server!');
    }
  }
}
