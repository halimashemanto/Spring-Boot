import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../doctor/model/doctor.model';
import { ScheduleSlotService } from '../schedule-slot-service';
import { DoctorService } from '../../doctor/doctor-service';
import { ScheduleSlotModel } from '../model/scheduleSlotModel.model';

@Component({
  selector: 'app-schedule-slot',
  standalone: false,
  templateUrl: './schedule-slot.html',
  styleUrl: './schedule-slot.css'
})
export class ScheduleSlot {



  doctors: Doctor[] = [];
  selectedDoctorId!: number;

  slot: Partial<ScheduleSlotModel> = {
    date: '',
    startTime: '',
    endTime: '',
    isBooked: false
  };

  createdSlot?: ScheduleSlotModel;

  constructor(
    private doctorService: DoctorService,
    private slotService: ScheduleSlotService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  // Load all doctors from backend
  loadDoctors(): void {
    this.doctorService.getAllDoctor().subscribe({
      next: (data) => {
        this.doctors = data;
        this.cd.markForCheck();
      },
      error: (err) => console.error('Error loading doctors', err)
    });
  }

  // Create a new schedule slot
  onSubmit(): void {
    if (!this.selectedDoctorId) {
      alert('Please select a doctor!');
      return;
    }

    const slotToCreate: ScheduleSlotModel = {
      doctor: { id: this.selectedDoctorId },
      date: this.slot.date!,
      startTime: this.slot.startTime!,
      endTime: this.slot.endTime!,
      isBooked: this.slot.isBooked!
    };

    this.slotService.createSlot(slotToCreate).subscribe({
      next: (res) => {
        this.createdSlot = res;
        alert('Slot created successfully!');
      },
      error: (err) => {
        console.error('Error creating slot:', err);
        alert('Error creating slot');
      }
    });
  }


}
