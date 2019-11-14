import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  
  apiKey='2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  url = 'https://jsonplaceholder.typicode.com/todos/1';
  res;

  constructor(private http: HttpClient) { 
    
  }

  getWeather(): Observable<any> {
    return this.http
    .get(this.url)
  }  
}