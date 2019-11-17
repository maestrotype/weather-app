import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ILocation } from '../location';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  current: ILocation;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.currentWeather.subscribe(data => (this.current = data));
    this.weatherService.testWeather();
    console.log(this.current);
  }

}
