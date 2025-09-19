import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth-service';
import { User } from '../../AllModel/user.model';

@Component({
  selector: 'app-view-prescription',
  standalone: false,
  templateUrl: './view-prescription.html',
  styleUrl: './view-prescription.css'
})
export class ViewPrescription {



   form: FormGroup;
  selectedFile?: File;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // ✅ File Change
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // ✅ Submit Form
  onSubmit() {
    if (this.form.invalid) return;

    const user: User = this.form.value;

    this.authService.registerAdmin(user, this.selectedFile).subscribe({
      next: (res) => {
        alert('Admin registered successfully!');
         console.log("Admin registered successfully!")
        this.form.reset();
      },
      error: (err) => {
        console.error(err);
       
      }
    });
  }
}
