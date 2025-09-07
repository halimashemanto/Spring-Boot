export interface BedDTO {
id?: number;
bedNumber: string;
occupied: boolean;
pricePerDay: number;
}


export interface FacilityDTO {
id?: number;
name: string;
description: string;
available: boolean;
}


export interface WardDTO {
id?: number;
wardName: string;
wardType: 'GENERAL' | 'CABIN' | 'ICU';
pricePerDay: number;
beds: BedDTO[];
facilities: FacilityDTO[];
}