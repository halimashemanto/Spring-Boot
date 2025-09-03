import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmergencyPatient } from '../model/emergencyPatient.model';
import { EmergencyPatientService } from '../emergency-patient-service';

@Component({
  selector: 'app-add-emergency-patient',
  standalone: false,
  templateUrl: './add-emergency-patient.html',
  styleUrl: './add-emergency-patient.css'
})
export class AddEmergencyPatient implements OnInit {
  patients: EmergencyPatient[] = [];
  newPatient: EmergencyPatient = {} as EmergencyPatient;

  constructor(private epService: EmergencyPatientService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

     this.epService.getAll().subscribe(data => {
    this.patients = data.map((p, index) => ({ ...p, id: index + 1 }));
  });
    this.loadPatients();
  }

  loadPatients(): void {
    this.epService.getAll().subscribe(data => this.patients = data);
    this.cdr.markForCheck();
  }

  createPatient(): void {
    this.epService.create(this.newPatient).subscribe(() => {
      this.loadPatients();
      this.newPatient = {} as EmergencyPatient;
    });
  }

updatePatient(p: EmergencyPatient) {
  const name = prompt("Update Name", p.patientName);
  if (name !== null) {
    p.patientName = name;
    this.epService.update(p.id!, p).subscribe(() => this.loadPatients());
  }
}

deletePatient(id: number) {
  if(confirm("Are you sure to delete this patient?")) {
    this.epService.delete(id).subscribe(() => this.loadPatients());
  }
}
}