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
  locationKeyTay = '318819';
  locationKey = '215805';
  locationKeyTelKharkiv = '323903'
  latKharkov = '49.949034';
  lonKharkov = '36.257655799999995';
  latIsrael = '32.109333';
  lonIsrael = '34.855499';
  latTay = '13.736717';
  lonTay = '100.523186';
  // temperature = 10;
  res;
  apiKey = '2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=';
  urlCitySearch = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  urlWeather = 'http://dataservice.accuweather.com/currentconditions/v1/' + this.locationKeyTay + '?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';

  currentWeather = new BehaviorSubject<ILocation>({
    locationId: 0,
    city: 'Tel Aviv',
    country: 'Israel',
    date: Date.now(),
    image: '',
    temperature: 12
  })

  constructor(private http: HttpClient) {
    this.getCurrentWeather('Kiev').subscribe(weather =>
      this.currentWeather.next(weather)
    )
  }

  testWeather() {
    console.log('1');
    this.getCurrentWeather('Tel Aviv').subscribe(weather =>
      this.currentWeather.next(weather)
    )
  }

  getCurrentWeather(
    search: string
  ): Observable<ILocation> {
    let uriParams = '';
    uriParams = `&q=${search}`;
    return this.getCurrentWeatherHelper(uriParams)
  }

  updateCurrentWeather(search: string) {  
    this.getCurrentWeather(search).subscribe(weather =>
      this.currentWeather.next(weather)
    )
  }

  private getCurrentWeatherHelper(uriParams: string): Observable<any> {
    console.log('getCurrentWeatherHelper', uriParams);
    return this.http
      .get<any>(
        this.urlCitySearch + uriParams
      )
      .pipe(map(data => this.getTemperature(data)))     
  }

  private transformToICurrentWeather(data: any, t: any): ILocation {
    console.log('transformToICurrentWeather', data);
    this.res = data;
    // this.locationKey = this.res.Key;
    // this.getTemperature(this.locationKey);
    return {
      locationId: 0,
      city: this.res.LocalizedName,
      country: this.res.Country.LocalizedName,
      date: Date.now(),
      image: '',
      temperature: t,
    }
  }
  private getLocation() {

  }
  private getTemperature(data) {
    this.res = data[0];
    this.locationKey = this.res.ParentCity.Key;
    console.log('key', this.locationKey);
    let t;
    this.http
      .get('http://dataservice.accuweather.com/currentconditions/v1/' + this.locationKey +'?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG')
      .subscribe(data => {
        console.log('t', data[0].Temperature.Metric.Value);
        t = data[0].Temperature.Metric.Value;
        this.transformToICurrentWeather(this.res, t)
      });
  }
}