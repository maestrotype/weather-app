import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getWeather().subscribe((response) => {
      console.log(response)
    })
  }

}
