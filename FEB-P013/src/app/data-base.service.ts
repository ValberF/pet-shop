import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IPet } from '../app/models/pet.model';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataBaseService implements OnInit {

  loadedPets: IPet[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  addPet(petData: IPet): Observable<any> {
    return this.http.post('https://petshop-707d6-default-rtdb.firebaseio.com/posts.json', petData);
  }

  getPets() {
    return this.http.get<{ [key: string]: IPet }>('https://petshop-707d6-default-rtdb.firebaseio.com/posts.json',
      {
        params: new HttpParams().set('print', 'pretty')
      }
    )
      .pipe(
        map((responseData) => {
          const postArray: IPet[] = [];
          for (const key in responseData) {
            if ((responseData).hasOwnProperty(key)) {
              postArray.push({ ...(responseData as any)[key], id: key });
            }
          }
          return postArray;
        }
        )
      );
  }

  deletePet(id: string) {
    return this.http.delete(`https://petshop-707d6-default-rtdb.firebaseio.com/posts/${id}.json`);
  }

  getPet(id: string) {
    return this.http.get<IPet>(`https://petshop-707d6-default-rtdb.firebaseio.com/posts/${id}.json`);
  }

  updatePet(id: string, petData: IPet
  ) {
    return this.http.put(`https://petshop-707d6-default-rtdb.firebaseio.com/posts/${id}.json`, petData, { observe: 'response' });
  }

}
