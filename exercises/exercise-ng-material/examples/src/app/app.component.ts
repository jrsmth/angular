import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'examples';
  isChecked = true;
  colours = [
    { id: 0, name: "Red" },
    { id: 1, name: "Green" },
    { id: 2, name: "Blue" }
  ];
  colourIdSelected = 1;

  onColourChange(id: number) {
      this.colourIdSelected = id;
  }

  onChange(event: any) {
    console.log(event);
  }
}
