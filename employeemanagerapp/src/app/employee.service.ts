import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient, private authService: AuthService) {}


  private getAuthHeaders(): HttpHeaders {
    const auth = this.authService.getAuthHeader();
    
    return new HttpHeaders({
      Authorization: auth ?? ''
    });
  }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee, {
      headers: this.getAuthHeaders()
    });
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee, {
      headers: this.getAuthHeaders()
    });
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    console.log('DELETE Auth Header:', this.getAuthHeaders().get('Authorization'));
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`, {
      headers: this.getAuthHeaders()
    });
  }
}