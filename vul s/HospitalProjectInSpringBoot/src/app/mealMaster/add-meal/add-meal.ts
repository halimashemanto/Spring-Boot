import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealService } from '../meal-service';
import { MealMasterService } from '../meal-master-service';
import { MealMaster } from '../model/mealMaster.model';
import { MealAdmittedPatient, MealDTO } from '../model/meal.model';

@Component({
  selector: 'app-add-meal',
  standalone: false,
  templateUrl: './add-meal.html',
  styleUrl: './add-meal.css'
})
export class AddMeal {

  form: FormGroup;
  allMeals: MealMaster[] = [];
  filteredTypes: string[] = [];
  totalCost: number = 0;
  patientDetails?: MealAdmittedPatient;

  constructor(
    private fb: FormBuilder,
    private mealMasterService: MealMasterService,
    private mealAdmittedService: MealService
  ) {
    this.form = this.fb.group({
      bedBookingId: ['', Validators.required],
      patientName: [''],
      age: [''],
      phone: [''],
      address: [''],
      servedAt: [''],
      category: ['', Validators.required],
      type: ['', Validators.required],
      meals: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Load all meals from master
    this.loadMeals();

    // 🟢 BedBooking ID changes → load patient automatically
    this.form.get('bedBookingId')?.valueChanges.subscribe(id => {
      if (id) this.loadPatient(Number(id));
      else this.resetPatientInfo();
    });

    // Category change → filter types
    this.form.get('category')?.valueChanges.subscribe(cat => {
      if (cat) {
        this.filteredTypes = [...new Set(this.allMeals.filter(m => m.category === cat).map(m => m.type))];
        this.form.patchValue({ type: '' });
      }
    });
  }

  get meals(): FormArray {
    return this.form.get('meals') as FormArray;
  }

  loadMeals() {
    this.mealMasterService.getAll().subscribe(data => this.allMeals = data);
  }

  resetPatientInfo() {
    this.patientDetails = undefined;
    this.form.patchValue({
      patientName: '',
      age: '',
      phone: '',
      address: ''
    });
    this.meals.clear();
    this.totalCost = 0;
  }
  loadPatient(bedBookingId: number) {
    this.mealAdmittedService.getPatientByBed(bedBookingId).subscribe({
      next: (p: MealDTO) => {
        if (!p) {
          this.resetPatientInfo();
          alert('No patient found for this BedBooking ID');
          return;
        }

        // Patch form fields
        this.form.patchValue({
          patientName: p.patientName || '',
          age: p.age || '',
          phone: p.phone || '',
          address: p.address || ''
        });

        // Map DTO → MealAdmittedPatient
        this.patientDetails = {
          bedBookingId,
          patientName: p.patientName,
          age: p.age,
          phone: p.phone,
          address: p.address,
          selectedMeals: (p.meals || []).map(m => ({
            id: m.mealId!,
            name: m.mealName!,
            category: m.mealCategory!,
            type: m.mealType!,
            price: m.mealCost!
          })),
          totalCost: p.totalCost
        };

        // Clear FormArray & prefill selected meals
        this.meals.clear();
        (this.patientDetails.selectedMeals || []).forEach(m =>
          this.meals.push(this.fb.group({
            mealId: [m.id],
            name: [m.name],
            price: [m.price]
          }))
        );

        this.calculateTotal();
      },
      error: err => {
        console.error('Error loading patient:', err);
        this.resetPatientInfo();
      }
    });
  }


  get allCategories(): string[] {
    return Array.from(new Set(this.allMeals.map(m => m.category)));
  }


  getMealsByType(): MealMaster[] {
    const cat = this.form.value.category;
    const type = this.form.value.type;
    return this.allMeals.filter(m => m.category === cat && m.type === type);
  }

  toggleMeal(event: any, meal: MealMaster) {
    if (event.target.checked) {
      this.meals.push(this.fb.group({
        mealId: [meal.id],
        name: [meal.name],
        price: [meal.price]
      }));
    } else {
      const index = this.meals.controls.findIndex(c => c.value.mealId === meal.id);
      if (index !== -1) this.meals.removeAt(index);
    }
    this.calculateTotal();
  }

  isMealSelected(mealId: number): boolean {
    return this.meals.controls.some(c => c.value.mealId === mealId);
  }

  calculateTotal() {
    this.totalCost = this.meals.controls
      .map(c => c.value.price)
      .reduce((a, b) => a + b, 0);
  }

  removeMeal(index: number) {
    this.meals.removeAt(index);
    this.calculateTotal();
  }

  save() {
    if (!this.form.value.bedBookingId) return alert('Please enter BedBooking ID!');
    const dto = {
      bedBookingId: this.form.value.bedBookingId,
      mealIds: this.form.value.meals.map((c: any) => Number(c.mealId)),

      servedAt: this.form.value.servedAt,
      type: this.form.value.type

    };

    // 👇 Log as formatted JSON
    console.log('DTO Payload:', JSON.stringify(dto, null, 2));

    
    this.mealAdmittedService.assignMeals(dto).subscribe(res => {
      alert('Meals assigned successfully!');
      this.loadPatient(this.form.value.bedBookingId);
    });
  }


}

