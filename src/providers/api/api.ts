import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'http://192.168.0.7:3000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  register(data): Observable<any> {
    return this.http.post(apiUrl+'users', JSON.stringify(data), httpOptions);
  }

  getUser(id): Observable<any> {
    return this.http.get(apiUrl+'users/'+id, httpOptions).pipe(
      map(this.extractData));
  }

}
