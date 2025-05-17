import { Component, OnInit, Input } from '@angular/core';
import { Popularity } from 'src/app/data/popularity';

@Component({
    selector: 'app-thermometer',
    templateUrl: './thermometer.component.html',
    styleUrls: ['./thermometer.component.css'],
    standalone: false
})
export class ThermometerComponent implements OnInit {
  @Input() popularity: number;

  constructor() { }

  ngOnInit() {
    // If popularity is not a number, set a default value
    if (typeof this.popularity !== 'number') {
        console.error("Invalid popularity data received:", this.popularity);
        this.popularity = 0;
    }
  }
  get barWidth(): string {
    return `${this.popularity}%`;
  }

  // Dynamically sets the progress bar color based on popularity (green shades)
  get barColor(): string {
    if (this.popularity >= 75) {
        return "#28a745"; // Dark Green for very popular
    } else if (this.popularity >= 50) {
        return "#85c94d"; // Medium Green
    } else if (this.popularity >= 25) {
        return "#d2e67b"; // Light Green
    } else {
        return "#f8d7da"; // Redish tint for very low popularity
    }
  }

}
