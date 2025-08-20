import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'Employee Manager'

  public loginUsername: string = ''
  public loginPassword: string = ''
  public loginError: string = ''

  public employees: Employee[] = [];
  public editEmployee: Employee = {
    id: 0,
    name: '',
    email: '',
    jobTitle: '',
    phone: '',
    imageUrl: '',
    employeeCode: ''
  };
  public deleteEmployee: Employee = {
    id: 0,
    name: '',
    email: '',
    jobTitle: '',
    phone: '',
    imageUrl: '',
    employeeCode: ''
  };

  constructor(private employeeService: EmployeeService, private authService: AuthService){}

  ngOnInit() {
    this.getEmployees();
  }

  get isAdmin(): boolean {
    return this.authService.isLoggedIn()
  }

  public onLogin(): void {
    if (!this.loginUsername || !this.loginPassword) {
      this.loginError = 'Username and password are required.';
      return;
    }

    const loginPayload = {
      username: this.loginUsername.trim(),
      password: this.loginPassword
    };

    this.authService.login(loginPayload).subscribe({
      next: () => {
        this.authService.setLoginState(this.loginUsername, this.loginPassword); // ✅ This sets the authHeader
        this.loginError = '';
        this.getEmployees();
        document.getElementById('login-modal-close')?.click();
        this.authService.setLoginState(this.loginUsername, this.loginPassword)
      },
      error: () => {
        this.loginError = 'Invalid credentials. Please try again.';
      }
    });
  }


  get currentUser(): string | null {
    return this.authService.getUsername();
  }
 
  public onLogout(): void {
    this.authService.logout();
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    if (!this.isAdmin) {
      alert('Access denied: Only admins can add employees.');
      return;
    }
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    if (!this.isAdmin) {
      alert('Access denied: Only admins can add employees.');
      return;
    }
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    if (!this.isAdmin) {
      alert('Access denied: Only admins can add employees.');
      return;
    }
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (!key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'login'){
      button.setAttribute('data-target', '#loginModal')
    }
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit' && employee) {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete' && employee) {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }



}