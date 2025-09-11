import { ChangeDetectorRef, Component } from '@angular/core';
import { MealMaster } from '../model/mealMaster.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealMasterService } from '../meal-master-service';

@Component({
  selector: 'app-add-meal-master',
  standalone: false,
  templateUrl: './add-meal-master.html',
  styleUrl: './add-meal-master.css'
})
export class AddMealMaster {

  mealMasters: MealMaster[] = [];
  form: FormGroup;
  editMode: boolean = false;
  editId: number | null = null;

  constructor(private service: MealMasterService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef
  ) {


    this.form = this.fb.group({
      category: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      details: [''],
      price: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMealMasters();
    this.cdr.markForCheck();
  }

  loadMealMasters() {
    this.service.getAll().subscribe(data => {
      this.mealMasters = data;
      this.cdr.markForCheck();

    });
  }

  submit() {
    if (this.editMode && this.editId != null) {
      this.service.update(this.editId, this.form.value).subscribe(() => {
        this.loadMealMasters();
        this.form.reset();
        this.editMode = false;
        this.editId = null;
      });
    } else {
      this.service.create(this.form.value).subscribe(() => {
        this.loadMealMasters();
        this.form.reset();
      });
      this.cdr.markForCheck();

    }
  }

  edit(meal: MealMaster) {
    this.editMode = true;
    this.editId = meal.id!;
    this.form.patchValue(meal);
  }

  delete(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.service.delete(id).subscribe(() => this.loadMealMasters());
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.editId = null;
    this.form.reset();
  }


}
