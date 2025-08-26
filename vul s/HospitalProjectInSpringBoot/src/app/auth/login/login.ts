import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
 loginForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



// onSubmit() {
//   this.userService.login(this.user as User).subscribe({
//     next: (response: AuthResponse) => {
//       console.log("Login successful:", response);

//       //Save Token in localStorage
//       localStorage.setItem('authToken', response.token);

//       this.successMessage = response.message;
//       this.errorMessage = '';

//       // Find role by decode JWT Token
//       const payload = JSON.parse(atob(response.token.split('.')[1]));
//       const role = payload.role;
//       const accountId = payload.id;
//       console.log("Account id "+accountId);

//       // Redirect By Role
//       if(role === 'ADMIN') {
//         this.router.navigate(['/admin-profile']);
//       } else if(role === 'EMPLOYEE') {
//         this.router.navigate(['/employee-profile']);
//       } else if(role === 'USER') {
//         this.router.navigate(['/account-profile']);

//       } else {
//         this.router.navigate(['/']);
//       }
//     },
//     error: (err) => {
//       console.error("Login failed:", err);
//       this.errorMessage = "Invalid email or password!";
//       this.successMessage = '';
//     }
//   });
// }




  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.successMessage = 'Login successful!';
        this.errorMessage = null;
        
        this.router.navigate(['/doctorprofile']); // Redirect to home or another route after login
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.successMessage = null;
      }
    });
  }

}
