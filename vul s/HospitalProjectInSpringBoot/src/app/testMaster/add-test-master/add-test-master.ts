import { ChangeDetectorRef, Component } from '@angular/core';
import { TestMaster } from '../model/testMaster.model';
import { TestMasterService } from '../test-master-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-test-master',
  standalone: false,
  templateUrl: './add-test-master.html',
  styleUrl: './add-test-master.css'
})
export class AddTestMaster {

  tests: TestMaster[] = [];
  form: FormGroup;
  editMode: boolean = false;
  editId: number | null = null;

  constructor(private testService: TestMasterService, 
    private cdr:ChangeDetectorRef,
    private fb: FormBuilder) {

    this.form = this.fb.group({
      testName: ['', Validators.required],
      testPrice: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadTests();
    this.cdr.markForCheck();
  }

  loadTests(): void {
    this.testService.getAllTests().subscribe(data => {
      this.tests = data;
      this.cdr.markForCheck();
    });
  }

  saveTest(): void {
    if (this.editMode && this.editId !== null) {
      this.testService.updateTest(this.editId, this.form.value).subscribe(() => {
        this.resetForm();
        this.loadTests();
      });
    } else {
      this.testService.addTest(this.form.value).subscribe(() => {
        this.resetForm();
        this.loadTests();
      });
      this.cdr.markForCheck();
    }
  }

  editTest(test: TestMaster): void {
    this.editMode = true;
    this.editId = test.id || null;
    this.form.patchValue({
      testName: test.testName,
      testPrice: test.testPrice
    });
  }

  deleteTest(id: number): void {
    if(confirm("Are you sure want to delete this test?")){
      this.testService.deleteTest(id).subscribe(() => {
        this.loadTests();
      });
    }
  }

  resetForm(): void {
    this.form.reset();
    this.editMode = false;
    this.editId = null;
  }


}
