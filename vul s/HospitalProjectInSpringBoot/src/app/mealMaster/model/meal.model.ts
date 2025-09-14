import { MealMaster } from "./mealMaster.model";

export interface MealAssign {
  id?: number;
  bedBookingId: number;
  patientName?: string;
  age?: number;
  phone?: string;
  address?: string;
  mealIds?: number[];
  totalCost?: number;
  selectedMeals?: MealMaster[];
}
