import { Component } from '@angular/core';
import { BedBookingViewDto } from '../model/allAdmittionView.model';
import { AllAdmittionViewService } from '../all-admittion-view-service';

@Component({
  selector: 'app-all-admittion-view',
  standalone: false,
  templateUrl: './all-admittion-view.html',
  styleUrl: './all-admittion-view.css'
})
export class AllAdmittionView {


 bookings: BedBookingViewDto[] = [];
  searchPhone: string = '';
  searchBedNumber: string = '';

  constructor(private allAdmittionService: AllAdmittionViewService) { }

  ngOnInit(): void {
    this.loadAllBookings();
  }

  loadAllBookings(): void {
    this.allAdmittionService.getAllBookingDetails().subscribe(
      data => this.bookings = data,
      err => console.error(err)
    );
  }

  searchByPhone(): void {
    if (!this.searchPhone) return this.loadAllBookings();

    this.allAdmittionService.getBookingDetailsByPhone(this.searchPhone).subscribe(
      data => this.bookings = data,
      err => console.error(err)
    );
  }

  searchByBedNumber(): void {
    if (!this.searchBedNumber) return this.loadAllBookings();

    this.allAdmittionService.getBookingDetailsByBedNumber(this.searchBedNumber).subscribe(
      data => this.bookings = data,
      err => console.error(err)
    );
  }


}
