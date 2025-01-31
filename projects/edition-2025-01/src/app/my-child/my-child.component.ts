import { Component, Input, input, model, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-child',
  imports: [],
  templateUrl: './my-child.component.html',
  styleUrl: './my-child.component.css',
})
export class MyChildComponent implements OnInit {
  data = input.required<string>();

  mutableData = model.required<string>();

  @Input({
    required: true,
  })
  classicInput = '';

  ngOnInit(): void {
    console.log('Data is: ', this.data());
  }

  update() {
    this.mutableData.set('Jimmy');
  }
}
