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
  apiKey = '2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=';
  urlWeather = 'http://dataservice.accuweather.com/currentconditions/v1/215805?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  // url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG&q=49.949034%2C36.257655799999995';
  latKharkov = '49.949034';
  lonKharkov = '36.257655799999995';
  latIsrael = '32.109333';
  lonIsrael = '34.855499';
  temperature = 0;
  res;
  currentWeather = new BehaviorSubject<ILocation>({
    locationId: 0,
    city: 'Tel Aviv',
    country: 'Israel',
    date: Date.now(),
    image: '',
    temperature: this.temperature
  })

  constructor(private http: HttpClient) {
    //  this.http.get(`${environment.baseUrl}dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG&q=` +
    // `${this.latIsrael}%2C${this.lonIsrael}`).subscribe(data => (this.res = data));
    this.http.get(this.urlWeather)
      .subscribe(data => {
        console.log('urlWeather', data[0].Temperature.Metric.Value);
        this.temperature = data[0].Temperature.Metric.Value
      });
       
      // .pipe(map(
      //   data => this.res = data));
    // .map(singleUser => new User(singleUser))));
  }

  testWeather() {
    // this.http
    //   .get(
    //     this.url
    //   )
    // .pipe(map(
    //   data => this.res = data));
    // .subscribe(data => (this.res = data));
    this.testCurrentWeather().subscribe(weather =>
      this.currentWeather.next(weather)
    )
  }

  testCurrentWeather() {
    console.log('test', this.res);
    return this.http
      .get<any>(
        this.url + this.apiKey + '&q=' +
        `${this.latIsrael}%2C${this.lonIsrael}`
      )
      .pipe(map(data => this.transformTest(data)))
  }

  private transformTest(data: any): ILocation {
    this.res = data;
    console.log('test', this.res);
    return {
      locationId: 0,
      city: this.res.AdministrativeArea.LocalizedName,
      country: this.res.Country.LocalizedName,
      date: Date.now(),
      image: '',
      temperature: this.temperature,
    }
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