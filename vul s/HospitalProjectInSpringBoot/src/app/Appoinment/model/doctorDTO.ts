
export interface DoctorDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
  study: string;
  chamber: string;
  joinDate: string; // or Date
  photo: string;
  departmentId?: number;
  departmentName?: string;
  departmentDescription?: string;
}
