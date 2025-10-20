import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WardService } from '../../ward/ward-service';
import { FacilityDTO, WardDTO } from '../../ward/model/bedBooking.model';

@Component({
  selector: 'app-word',
  standalone: false,
  templateUrl: './word.html',
  styleUrl: './word.css'
})
export class Word {
 wards: WardDTO[] = [];
  facilities: FacilityDTO[] = [];
  facilityForm!: FormGroup;
  selectedWardId!: number;

  constructor(private fb: FormBuilder,
     private wardService: WardService,
    private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.facilityForm = this.fb.group({
      wardId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.cdr.markForCheck();

    // Load all wards
    this.wardService.getWards().subscribe({

       next: (data) => {


        this.wards = data;
        this.cdr.markForCheck();
      },
      error: (err) => {

        console.log(err)
      }
    });
  }

  loadFacilities(wardId: any) {
    this.selectedWardId = Number(wardId);
    if (this.selectedWardId) {
      this.wardService.getFacilities(this.selectedWardId)
        .subscribe(data => this.facilities = data);
        this.cdr.markForCheck();
        
    } else {
      this.facilities = [];
    }
  }

  onSubmit() {
    if (!this.facilityForm.valid) return;

    const { wardId, name, description } = this.facilityForm.value;
    const dto: FacilityDTO = { name, description, isAvailable: true };

    this.wardService.addFacility(wardId, dto).subscribe(() => {
      this.facilityForm.reset();
      this.loadFacilities(wardId);
    });
  }
}
