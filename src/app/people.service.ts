import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { People } from './people';

//in place where you wanted to use `HttpClient`
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getPeople(): Observable<People[]> {
        return this.http.get<People[]>(`${this.apiServerUrl}/people/all`)
    }

    public addPerson(person: People): Observable<People> {
        return this.http.post<People>(`${this.apiServerUrl}/people/add`, person);
    }

    public updatePerson(person: People): Observable<People> {
        return this.http.put<People>(`${this.apiServerUrl}/people/update`, person);
    }

    public deletePerson(personId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/people/delete/${personId}`);
    }
}