import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  
  apiKey='2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  static url = 'https://developer.github.com/v3/'

  constructor(private http: HttpClient) { 
    
  }

  getWeather(): Observable<any> {
    return this.http
    .get(WeatherService.url)
    .pipe(map((res)=>{
      res;
    }))
  }  
}