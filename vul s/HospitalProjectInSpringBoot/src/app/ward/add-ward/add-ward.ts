import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Bed, Ward } from '../model/ward.model';

import { WardService } from '../ward-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WardDTO } from '../model/bedBooking.model';

@Component({
  selector: 'app-add-ward',
  standalone: false,
  templateUrl: './add-ward.html',
  styleUrl: './add-ward.css'
})
export class AddWard {

  wards: WardDTO[] = [];
  wardForm!: FormGroup;

  constructor(private wardService: WardService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadWards();
    this.wardForm = this.fb.group({
      wardName: ['', Validators.required],
      wardType: ['', Validators.required],
      pricePerDay: ['', Validators.required]
    });
  }

 loadWards() {
  this.wardService.getWards().subscribe(data => {
    this.wards = data.map(w => ({
      ...w,
      facilities: w.facilities || []
    }));
    this.cdr.markForCheck();
  });
}


  onSubmit() {
    if (this.wardForm.valid) {
      this.wardService.createWard(this.wardForm.value).subscribe(() => {
        this.wardForm.reset();
        this.loadWards();
      });
    }
  }
}


