export interface Bed {
  id: number;
  bedNumber: string;
  isOccupied: boolean;
  pricePerDay: number;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  isAvailable: boolean;
}

export interface Ward {
  id: number;
  wardName: string;
  wardType: string;
  pricePerDay: number;
  beds: Bed[];
  facilities: Facility[];
}
