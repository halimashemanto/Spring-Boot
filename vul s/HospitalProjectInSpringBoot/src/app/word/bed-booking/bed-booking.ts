import { ChangeDetectorRef, Component } from '@angular/core';
import { BedBookingDTO, BedDTO, WardDTO } from '../model/bedBooking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BedBookingService } from '../bed-booking-service';
import { WardService } from '../../ward/ward-service';

@Component({
  selector: 'app-bed-booking',
  standalone: false,
  templateUrl: './bed-booking.html',
  styleUrl: './bed-booking.css'
})
export class BedBooking {

  wards: WardDTO[] = [];
  beds: BedDTO[] = [];
  selectedWard?: WardDTO;
  bookingForm!: FormGroup;

  constructor(private wardService: WardService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      patientName: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      broughtBy: ['', Validators.required],
      admissionDate: ['', Validators.required]
    });

    this.loadWards();
  }

  loadWards() {
    this.wardService.getWards().subscribe({
      next: (data) => {


        this.wards = data;
        this.cdr.markForCheck();
      },
      error: (err) => {

        console.log(err)
      }
    });
    ;
  }

  selectedWardId: number | null = null;

  selectWard(wardId: number) {
    this.selectedWard = this.wards.find(w => w.id === wardId);
    if (this.selectedWard) {
      this.wardService.getBeds(this.selectedWard.id!).subscribe(data => this.beds = data);
    }
  }


  bookBed(bed: BedDTO) {
    if (this.bookingForm.invalid) return;

    const dto: BedBookingDTO = {
      bedId: bed.id!,
      patientName: this.bookingForm.value.patientName,
      age: this.bookingForm.value.age,
      phone: this.bookingForm.value.phone,
      address: this.bookingForm.value.address,
      broughtBy: this.bookingForm.value.broughtBy,
      admissionDate: new Date(this.bookingForm.value.admissionDate),
      dischargeDate: null
    };

    this.wardService.bookBed(dto).subscribe(() => {
      bed.occupied = true;
      this.bookingForm.reset();
    });
  }

  releaseBed(bed: BedDTO) {
    this.wardService.releaseBed(bed.id!).subscribe(() => {
      bed.occupied = false;
    });
  }



}