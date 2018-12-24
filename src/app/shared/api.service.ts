import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
const searchString = 'tom+segura+joey+diaz'
const endpoint = 'https://listennotes.p.mashape.com/api/v1/search?language=English&len_min=2&offset=0&q='+ searchString + '&sort_by_date=0';
const httpOptions = {
  headers: new HttpHeaders({
    'X-Mashape-Key': '0px2cbD9RLmshLtIBZqgWZQiDvWCp1KsuKAjsnksI7YJcFH7xn',
    'Accept': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }
  private extractData(res: Response) {
    let body = res;
    console.log(body);
    return body || { };
  }
  getPods(): Observable<any> {
    return this.http.get(endpoint + 'pods', httpOptions).pipe(
      map(this.extractData));

  }

}
// unirest.get("https://listennotes.p.mashape.com/api/v1/search?language=English&len_min=2&offset=0&q=Joey+Diaz+Tom+Segura&sort_by_date=0")
// .header("X-Mashape-Key", "0px2cbD9RLmshLtIBZqgWZQiDvWCp1KsuKAjsnksI7YJcFH7xn")
// .header("Accept", "application/json")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });
