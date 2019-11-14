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
  data: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getWeather().subscribe((response) => {
      this.data = response;
      console.log(this.data);
      this.location = {
        locationId: this.data.AdministrativeArea.ID,
        locationName: this.data.LocalizedName,
        locationWeather: '33 C'
      }
    })
  }

}
