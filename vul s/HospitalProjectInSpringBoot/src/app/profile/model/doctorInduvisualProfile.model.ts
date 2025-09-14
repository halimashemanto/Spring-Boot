export interface DoctorDTO {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    status: string;
    study: string;
    chamber: string;
    joinDate: string;
    photo: string;
    departmentId: number | null;
    departmentName: string | null;
    departmentDescription: string | null;
}
