export interface TestInfo {
  id: number;
  testName: string;
  testPrice: number;
}

export interface TestAdmittedPatient {
  id?: number;
  bedBookingId: number;
  patientName?: string;
  age?: number;
  phone?: string;
  address?: string;
  testIds?: number[];
  testCost?: number;
  selectedTests?: TestInfo[];
}
