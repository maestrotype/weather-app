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
  lonTay =  '100.523186';
  temperature = 10;
  res;
  apiKey = '2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=';
  urlCitySearch = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  urlWeather = 'http://dataservice.accuweather.com/currentconditions/v1/' + this.locationKeyTay +'?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG';
  // url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG&q=49.949034%2C36.257655799999995';
  
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
    // this.http.get(this.urlWeather)
    //   .subscribe(data => {
    //     console.log('urlWeather', data[0]);
    //     this.temperature = data[0].Temperature.Metric.Value
    //   });
       
      // .pipe(map(
      //   data => this.res = data));
    // .map(singleUser => new User(singleUser))));
  }

  testWeather() {

    this.getCurrentWeather('Tel Aviv').subscribe(weather =>
      this.currentWeather.next(weather)
    )
  }

  // testCurrentWeather() {
  //   return this.http
  //     .get<any>(
  //       this.url + this.apiKey + '&q=' +
  //       `${this.latKharkov}%2C${this.lonKharkov}`
  //     )
  //     .pipe(map(data => this.transformTest(data)))
  // }

  
  private getTemperature(locationKey: string) {
    console.log('key', locationKey);
    this.http
      .get('http://dataservice.accuweather.com/currentconditions/v1/' + locationKey +'?apikey=2wjh8FbS9yAwHBXpy9g9aGfItsTVKAYG')
      .subscribe(data => {
        console.log('urlWeather', data[0]);
        this.temperature = data[0].Temperature.Metric.Value
      });
  }

  private transformTest(data: any): ILocation {
    this.res = data;
    console.log('transformTest', this.res);
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
    search: string
  ): Observable<ILocation> {
    let uriParams = '';
    uriParams = `&q=${search}`;
    return this.getCurrentWeatherHelper(uriParams)
  }

  private getCurrentWeatherHelper(uriParams: string): Observable<ILocation> {
    console.log('getCurrentWeatherHelper', uriParams);
    return this.http
      .get<any>(
        this.urlCitySearch + uriParams
        // `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
        //   `${uriParams}&appid=${environment.appId}`
      )
      .pipe(map(data =>
        this.transformToICurrentWeather(data)
        ))
        
  }

  private transformToICurrentWeather(data: any): ILocation {
    console.log('search', data);
    this.res = data[0];
    this.locationKey = this.res.ParentCity.Key;
    this.getTemperature(this.locationKey);
    return {
      locationId: 0,
      city: this.res.AdministrativeArea.LocalizedName,
      country: this.res.Country.LocalizedName,
      date: Date.now(),
      image: '',
      temperature: this.temperature,
    }
  }

  updateCurrentWeather(search: string) {
    
    this.getCurrentWeather(search).subscribe(weather =>
      this.currentWeather.next(weather)
    )
  }
}