import { ChangeDetectorRef, Component } from '@angular/core';

import { ScheduleSlotService } from '../schedule-slot-service';
import { Doctor } from '../../doctor/model/doctor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleSlotModel } from '../model/scheduleSlotModel.model';
import { DoctorService } from '../../doctor/doctor-service';



@Component({
  selector: 'app-schedule-slot',
  standalone: false,
  templateUrl: './schedule-slot.html',
  styleUrl: './schedule-slot.css'
})
export class ScheduleSlot {



  slotForm: FormGroup;
  doctors: Doctor[] = [];
  slots: any[] = [];

   selectedDoctorId: number | null = null;
  selectedDate: string | null = null; 


  constructor(
    private fb: FormBuilder,
    private slotService: ScheduleSlotService,
    private doctorService: DoctorService,
    private cdr : ChangeDetectorRef
  ) {
    this.slotForm = this.fb.group({
      doctor: [null],
      date: [''],
      startTime: [''],
      endTime: [''],
      isBooked: [false]
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSlots();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctor().subscribe({
      
      next: (data) => {
        this.doctors = data;
        this.cdr.markForCheck();
      },      
      error: (err) => {
        console.error('Error loading doctors', err);
      }
      
    });
   
  }

 
loadSlots(): void {
  this.slotService.getAllSlots().subscribe({
    next: (data) => {
      this.slots = data.map(slot => ({
        ...slot,
        doctor: slot.doctor || { doctorName: 'Unknown' }         
      }));
       this.cdr.markForCheck();
    },
    error: err => console.error(err)
  });
 
}


filterSlots(): void {
    this.slotService.getAllSlots().subscribe({
      next: (data) => {
        this.slots = data.filter(slot => {
          const matchesDoctor = this.selectedDoctorId
            ? slot.doctor?.id === this.selectedDoctorId
            : true;

          const matchesDate = this.selectedDate
            ? new Date(slot.date).toISOString().slice(0, 10) === this.selectedDate
            : true;

          return matchesDoctor && matchesDate;
        });
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error filtering slots', err)
    });
  }


onSubmit(): void {
  if (this.slotForm.invalid) return;

  const selectedDoctor: Doctor = this.slotForm.value.doctor;

  const newSlot: ScheduleSlotModel = {
    id: this.slotForm.value.id, 
    date: this.slotForm.value.date,
    startTime: this.slotForm.value.startTime,
    endTime: this.slotForm.value.endTime,
    booked: this.slotForm.value.isBooked || false,
    doctor: selectedDoctor   
  };

  this.slotService.createSlot(newSlot, selectedDoctor.id!).subscribe({
    next: () => {
      // alert('Schedule slot saved!');
      this.slotForm.reset({ isBooked:false, doctor:null });
      this.loadSlots();
        this.cdr.markForCheck();
    },
    error: err => console.error(err)
  });

}

  deleteSlot(slotId: number): void {
    if (confirm('Are you sure you want to delete this slot?')) {
      this.slotService.deleteSlot(slotId).subscribe({
        next: () => this.loadSlots(),
        error: (err) => console.error('Error deleting slot', err)
      });
    }
  }

  editSlot(slot: ScheduleSlotModel) {
  this.slotForm.patchValue({
    doctor: slot.doctor,
    date: slot.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    id: slot.id
  });
}


}
















//  slotForm!: FormGroup;
//   slots: ScheduleSlotModel[] = [];
//   doctors: Doctor[] = [];
//   isEditing: boolean = false;
//   selectedId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private slotService: ScheduleSlotService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.loadDoctors();
//     this.loadSlots();

//     this.slotForm = this.fb.group({
//       date: ['', Validators.required],
//       startTime: [''],
//       endTime: [''],
//       booked: [false],
//       doctor: [null]
//     });
//   }

  
//   loadDoctors() {
//     this.slotService.getAllDoctor().subscribe({
//       next: (data) => (this.doctors = data),
//       error: (err) => console.error('Error loading doctors', err)
//     });
//   }

 
//   loadSlots() {
//     this.slotService.getAllSlots().subscribe(data => {
//       this.slots = data;
//       this.cdr.markForCheck();
//     })
//   }

//   // onSubmit() {
//   //   if (this.slotForm.invalid) return;

//   //   const slot: ScheduleSlot = {
   
//   //      date: this.slotForm.value.date,
//   //     startTime: this.slotForm.value.startTime,
//   //     endTime: this.slotForm.value.endTime,
//   //     booked: this.slotForm.value.booked,
//   //     doctor: this.slotForm.value.doctor
//   //   };

//   //   const doctorId = this.slotForm.value.doctor.id;

//   //   this.slotService.saveSlot(slot, doctorId).subscribe({
//   //     next: () => {
//   //       this.loadSlots();
//   //       this.resetForm();
//   //     },
//   //     error: (err) => console.error('Error saving slot', err)
//   //   });
//   // }










//   deleteSlot(slotId: number) {
//     if (confirm('Are you sure you want to delete this slot?')) {
//       this.slotService.deleteSlot(slotId).subscribe({
//         next: () => this.loadSlots(),
//         error: (err) => console.error('Error deleting slot', err)
//       });
//     }
//   }


//   resetForm() {
//     this.slotForm.reset({ booked: false });
//     this.isEditing = false;
//     this.selectedId = null;
//   }

//   // ✅ Edit slot

// }