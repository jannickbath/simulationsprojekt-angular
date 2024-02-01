import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuotableApiResponse } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class QuotableService {
  private _baseUrl: string = "https://api.quotable.io/quotes/random";
  public maxTextLength: number = 40;

  constructor(private http: HttpClient) { }

  public getQuote(maxLengthParam: number = this.maxTextLength) {
    return <Observable<Array<QuotableApiResponse>>>this.http.get(this._baseUrl + "?maxLength=" + maxLengthParam);
  }
}
