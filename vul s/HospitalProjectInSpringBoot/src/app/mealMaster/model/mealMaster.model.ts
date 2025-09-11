export interface MealMaster {
  id?: number;
  category: string;  // Breakfast / Lunch / Dinner / Snack
  type: string;      // Set1 / Set2 / Special / Diet
  name: string;
  details: string;
  price: number;
}
