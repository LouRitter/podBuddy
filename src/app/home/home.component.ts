import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

export interface Term {
  word: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pods: any = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  terms: Term[] = [

  ];
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getPods();
  }

  getPods() {
    this.pods = [];
    this.api.getPods('joe+rogan').subscribe((data: any) => {
      console.log(data.results);
      this.pods = data.results;
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.terms.push({word: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(term: Term): void {
    const index = this.terms.indexOf(term);

    if (index >= 0) {
      this.terms.splice(index, 1);
    }
  }
}

