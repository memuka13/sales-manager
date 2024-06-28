import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from '../models';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagersService {
  constructor(private http: HttpClient) {}

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${environment.baseUrl}/managers`);
  }

  updateManager(manager: Manager): Observable<Manager> {
    return this.http.put<Manager>(
      `${environment.baseUrl}/managers/${manager.id}`,
      manager
    );
  }

  addManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(`${environment.baseUrl}/managers`, manager);
  }
}
