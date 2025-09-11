export interface Meal {
  mealId?: number;
  mealMasterId: number;
  bedBookingId: number;
  servedAt: Date;
}

export interface MealDTO {
  patientName?: string;
  phone?: string;
  age?: number;
  address?: string;
  totalCost?: number;
  meals?: {
    mealId: number;
    mealName: string;
    mealCategory: string;
    mealType: string;
    mealCost: number;
    servedAt: Date;
  }[];
}
