import { ChangeDetectorRef, Component } from '@angular/core';
import { BedDTO, WardDTO } from '../model/bedBooking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WardService } from '../ward-service';

@Component({
  selector: 'app-bed-booking-modal-component',
  standalone: false,
  templateUrl: './bed-booking-modal-component.html',
  styleUrl: './bed-booking-modal-component.css'
})
export class BedBookingModalComponent {



  wards: WardDTO[] = [];
  beds: BedDTO[] = [];
  selectedWardId!: number;
  bedForm!: FormGroup;

  constructor(
    private wardService: WardService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadWards();

    this.bedForm = this.fb.group({
      wardId: [null, Validators.required],
      bedNumber: ['', Validators.required],
      pricePerDay: ['', Validators.required]
    });

    // ward change hole automatic bed load hobe
    this.bedForm.get('wardId')?.valueChanges.subscribe((wardId: number) => {
      if (wardId) {
        this.selectedWardId = wardId;
        this.loadBeds(wardId);
      }
    });
  }

  loadWards() {
    this.wardService.getWards().subscribe(data => {
      this.wards = data;
      this.cdr.markForCheck();
    });
  }

  loadBeds(wardId: number) {
    this.wardService.getBeds(wardId).subscribe(data => {
      this.beds = data;
      this.cdr.markForCheck();
    });
  }

  onSubmit() {
    if (this.bedForm.valid) {
      const { wardId, bedNumber, pricePerDay } = this.bedForm.value;
      const bed: BedDTO = { bedNumber, pricePerDay };

      this.wardService.createBed(wardId, bed).subscribe(newBed => {
        // ✅ instantly add korbo jodi API new bed return kore
        if (newBed) {
          this.beds.push(newBed);
        } else {
          // fallback: reload beds
          this.loadBeds(wardId);
        }

        // ✅ form reset (wardId unchanged)
        this.bedForm.patchValue({
          bedNumber: '',
          pricePerDay: ''
        });
      });
    }
  }

  

}
