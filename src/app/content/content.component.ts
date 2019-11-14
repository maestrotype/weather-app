import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ILocation } from '../location';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  location: ILocation;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getWeather().subscribe((response) => {
      console.log(response);
      this.location = {
        locationId: 2,
        locationName: 'Tel Aviv',
        locationWeather: '33 C'
      }
    })
  }

}
