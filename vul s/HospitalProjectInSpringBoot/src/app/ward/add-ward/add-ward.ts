import { Component, OnInit } from '@angular/core';
import { Bed, Ward } from '../model/ward.model';
import { BedBooking } from '../model/bedBooking.model';
import { WardService } from '../ward-service';

@Component({
  selector: 'app-add-ward',
  standalone: false,
  templateUrl: './add-ward.html',
  styleUrl: './add-ward.css'
})
export class AddWard  implements OnInit{



    wards: Ward[] = [];
  bookingData: BedBooking = { bedId: 0, patientName: '', admissionDate: '' };

  constructor(private wardService: WardService) {}

  ngOnInit(): void {
    this.loadWards();
  }

  loadWards() {
    this.wardService.getAllWards().subscribe(data => {
      this.wards = data;
    });
  }

  bookBed(bed: Bed) {
    const name = prompt("Enter patient name:");
    const admission = prompt("Admission date (yyyy-MM-dd):");
    if(name && admission) {
      this.bookingData = { bedId: bed.id, patientName: name, admissionDate: admission };
      this.wardService.bookBed(bed.id, this.bookingData).subscribe(res => {
        alert(`Bed booked! Total charge: ${res.totalCharge}`);
        this.loadWards();
      });
    }
  }

  releaseBed(bed: Bed) {
    this.wardService.releaseBed(bed.id).subscribe(res => {
      alert(`Bed released for patient: ${res.patientName}`);
      this.loadWards();
    });
  }
}
