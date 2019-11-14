import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  
  apiKey='2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG&q=49.949034%2C36.257655799999995';
  res;

  constructor(private http: HttpClient) { 
    
  }

  getWeather(): Observable<any> {
    return this.http
    .get(this.url)
  }  
}