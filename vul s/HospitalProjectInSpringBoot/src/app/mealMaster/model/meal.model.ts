export interface MealInfo {
  id: number;
  category: string;
  type: string;
  name: string;
  details?: string;
  price: number;
}

export interface MealAdmittedPatient {
  id?: number;
  bedBookingId: number;
  patientName?: string;
  age?: number;
  phone?: string;
  address?: string;
  mealIds?: number[];
  totalCost?: number;
  selectedMeals?: MealInfo[];
}

export interface MealDTO {
  mealId?: number;
  mealName?: string;
  mealCategory?: string;
  mealType?: string;
  mealCost?: number;
  servedAt?: Date;

  // Patient info
  patientName?: string;
  age?: number;
  phone?: string;
  address?: string;

  // List of meals & total
  meals?: MealDTO[];
  totalCost?: number;
}
