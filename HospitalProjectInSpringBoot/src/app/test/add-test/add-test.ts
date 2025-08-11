import { ChangeDetectorRef, Component } from '@angular/core';
import { Test } from '../model/test.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../test-service';


@Component({
  selector: 'app-add-test',
  standalone: false,
  templateUrl: './add-test.html',
  styleUrl: './add-test.css'
})
export class AddTest {
 
  tests: Test[] = [];
  testId !:number;
  testForm!: FormGroup;
  editMode = false;

  constructor(private testService: TestService, 
    private fb: FormBuilder,
    private cdr : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTests();

    this.testForm = this.fb.group({
      id: [], // let JSON Server auto-generate or handle manually
      testName: ['', Validators.required],
      testPrice: [0, [Validators.required, Validators.min(1)]]
    });
  }

  loadTests(): void {
    this.testService.getAllTests().subscribe(data => {
      this.tests = data;
      this.cdr.markForCheck();
    });
  }

 onSubmit(): void {
  const test: Test = this.testForm.value;
  

  if (this.editMode) {
    this.testService.updateTest(test).subscribe(() => {
      this.loadTests();
      this.testForm.reset();
      this.editMode = false;
    });
  } else {
    this.testService.createTest(test).subscribe(() => {
      this.loadTests();
      this.testForm.reset();
    });
  }
}

  onEdit(test: Test): void {
    this.testForm.patchValue(test);
    this.editMode = true;
  }

  onDelete(id: number): void {
  if (confirm('Are you sure to delete this test?')) {
    this.testService.deleteTest(id).subscribe(() => this.loadTests());
  }
}
}
