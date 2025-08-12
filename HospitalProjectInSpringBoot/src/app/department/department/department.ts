import { ChangeDetectorRef, Component } from '@angular/core';
import { DepartmentModel } from '../model/departmentModel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../department-service';

@Component({
  selector: 'app-department',
  standalone: false,
  templateUrl: './department.html',
  styleUrl: './department.css'
})
export class Department {

  departments: DepartmentModel[] = [];
  departmentForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadDepartments();

    this.departmentForm = this.fb.group({
      id: [null], // Used for edit
      departmentName: ['', Validators.required],
      description: ['', Validators.required]
      
    });
  }

  loadDepartments() {
    this.departmentService.getAllDepartment().subscribe(data => {
      this.departments = data;
      this.cdr.markForCheck();
    });
  }



  onSubmit(): void {
    const department: DepartmentModel = this.departmentForm.value;

    if (this.isEditMode && department.id) {
      this.departmentService.updateDepartment(department).subscribe(() => {
        this.loadDepartments();
        this.resetForm();
      });
    } else {
      this.departmentService.addDepartment(department).subscribe(() => {
        this.loadDepartments();
        this.resetForm();
      });
    }
  }



  editDepartment(dep: DepartmentModel) {
    this.isEditMode = true;
     this.departmentForm.patchValue({
      departmentName: dep.departmentName,
      description: dep.description
    });
  }
  
  
  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe(() => {
        this.loadDepartments();
      });
    }
  }

   resetForm(): void {
    this.departmentForm.reset();
    this.isEditMode = false;
  }
}
