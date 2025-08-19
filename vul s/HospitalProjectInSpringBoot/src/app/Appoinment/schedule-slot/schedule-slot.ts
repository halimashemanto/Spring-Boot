import { ChangeDetectorRef, Component } from '@angular/core';

import { ScheduleSlotService } from '../schedule-slot-service';
import { Doctor } from '../../doctor/model/doctor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleSlotModel } from '../model/scheduleSlotModel.model';
import { DoctorService } from '../../doctor/doctor-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';


@Component({
  selector: 'app-schedule-slot',
  standalone: false,
  templateUrl: './schedule-slot.html',
  styleUrl: './schedule-slot.css'
})
export class ScheduleSlot {



  slotForm: FormGroup;
  doctors: Doctor[] = [];
  slots: ScheduleSlotModel[] = [];

  constructor(
    private fb: FormBuilder,
    private slotService: ScheduleSlotService,
    private doctorService: DoctorService
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
      next: (data) => this.doctors = data,
      error: (err) => console.error('Error loading doctors', err)
    });
  }

  loadSlots(): void {
    this.slotService.getAllSlots().subscribe({
      next: (data) => this.slots = data,
      error: (err) => console.error('Error loading slots', err)
    });
  }

  onSubmit(): void {
    if (this.slotForm.invalid) {
      alert('Please fill all fields.');
      return;
    }

    const selectedDoctor: Doctor = this.slotForm.value.doctor;

    const newSlot: ScheduleSlotModel = {
      date: this.slotForm.value.date,
      startTime: this.slotForm.value.startTime,
      endTime: this.slotForm.value.endTime,
      booked: false,
      doctor: selectedDoctor
    };

    this.slotService.createSlot(newSlot, selectedDoctor.id!).subscribe({
      next: () => {
        alert('Schedule slot added!');
        this.slotForm.reset({ isBooked: false, doctor: null });
        this.loadSlots();
      },
      error: (err) => {
        console.error('Error saving slot', err);
        alert('Failed to save slot. Check console.');
      }
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