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
  terms: string[] = [];
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getPods('Joe Rogan');
  }

  getPods(name: string) {
    this.pods = [];
    this.api.getPods(name).subscribe((data: any) => {
      console.log(data.results);
      this.pods = data.results;
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.terms.push( value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    const search = this.terms.toLocaleString();
    console.log(JSON.stringify(this.terms));
    this.getPods(search);
  }
  remove(term: string): void {
    const index = this.terms.indexOf(term);

    if (index >= 0) {
      this.terms.splice(index, 1);
    }
  }
}

