import { Component } from '@angular/core';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'podbuddy';
  pods:any = [];

  constructor(public api:ApiService) { }

  ngOnInit() {
    this.getPods();
  }

  getPods() {
    this.pods = [];
    this.api.getPods().subscribe((data: {}) => {
      console.log(data);
      this.pods = data;
    });
  }
}
