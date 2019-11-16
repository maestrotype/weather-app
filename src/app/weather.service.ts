import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILocation } from './location';
import { environment } from 'src/environments/environment';

@Injectable()
export class WeatherService {

  url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG&q=49.949034%2C36.257655799999995';
  latIsrael = '32.109333';
  lonIsrael = '34.855499';
  res;
  currentWeather = new BehaviorSubject<ILocation>({
    locationId: 0,
    city: 'Tel Aviv',
    country: 'Israel',
    date: Date.now(),
    image: '',
    temperature: 0
  })

  constructor(private http: HttpClient) {
    //  this.http.get(`${environment.baseUrl}dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG&q=` +
    // `${this.latIsrael}%2C${this.lonIsrael}`).subscribe(data => (this.res = data));
    this.http.get(this.url).subscribe(data => this.res)
    console.log('constructor', this.res)
  }

  testWeather() {
    this.http
      .get(
        this.url
      )
      .subscribe(data => (this.res = data));
      console.log(this.res);  
  }

  getCurrentWeather(
    search: string | number,
    country?: string
  ): Observable<ILocation> {
    let uriParams = ''
    if (typeof search === 'string') {
      uriParams = `q=${search}`
    } else {
      uriParams = `zip=${search}`
    }

    if (country) {
      uriParams = `${uriParams},${country}`
    }

    return this.getCurrentWeatherHelper(uriParams)
  }

  private getCurrentWeatherHelper(uriParams: string): Observable<ILocation> {
    return this.http
      .get<any>(
        this.url
        // `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
        //   `${uriParams}&appid=${environment.appId}`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data: any): ILocation {
    return {
      locationId: data.id,
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `${environment.baseUrl}openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: data.main.temp,
    }
  }

  updateCurrentWeather(search: string | number, country?: string) {
    this.getCurrentWeather(search, country).subscribe(weather =>
      this.currentWeather.next(weather)
    )
  }
}