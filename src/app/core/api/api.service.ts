import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  fetchRandomImages(): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('client_id', 'fd08bfad9d4b28395b3357b033e912e9d1844d2fff4c7d157e37d033de52f412')
      .set('per_page', '100');
    return this.http.get('https://api.unsplash.com/photos/', { params });
  }
}
