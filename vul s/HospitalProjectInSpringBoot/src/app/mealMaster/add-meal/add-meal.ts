import { Component } from '@angular/core';
import { Meal, MealDTO } from '../model/meal.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealService } from '../meal-service';

@Component({
  selector: 'app-add-meal',
  standalone: false,
  templateUrl: './add-meal.html',
  styleUrl: './add-meal.css'
})
export class AddMeal {

   form: FormGroup;
  mealDTO?: MealDTO;
  editMode: boolean = false;
  editingMealId?: number;

  constructor(private fb: FormBuilder, private mealService: MealService) {
    this.form = this.fb.group({
      mealMasterId: [null, Validators.required],
      bedBookingId: [null, Validators.required],
      servedAt: [new Date(), Validators.required]
    });
  }

  ngOnInit() {}

  submit() {
    const meal: Meal = this.form.value;

    if(this.editMode && this.editingMealId){
      meal.mealId = this.editingMealId;
    }

    this.mealService.addMeal(meal).subscribe(() => {
      if(meal.bedBookingId){
        this.loadMeals(meal.bedBookingId);
      }
      this.form.reset();
      this.editMode = false;
      this.editingMealId = undefined;
    });
  }

  loadMeals(bedBookingId: number){
    this.mealService.getMealsByBedBooking(bedBookingId).subscribe(res => {
      this.mealDTO = res;
    });
  }

  editMeal(meal: any){
    this.editMode = true;
    this.editingMealId = meal.mealId;
    this.form.patchValue({
      mealMasterId: meal.mealMasterId,
      bedBookingId: meal.bedBookingId,
      servedAt: meal.servedAt
    });
  }

  deleteMeal(mealId: number, bedBookingId: number){
    this.mealService.deleteMeal(mealId).subscribe(() => this.loadMeals(bedBookingId));
  }

}
