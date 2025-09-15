import { ChangeDetectorRef, Component } from '@angular/core';
import { OfficeStaff } from '../model/officeStaff.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-office-staff',
  standalone: false,
  templateUrl: './view-office-staff.html',
  styleUrl: './view-office-staff.css'
})
export class ViewOfficeStaff {


 officestaffs: OfficeStaff[] = [];
  
    constructor(private http: HttpClient,
      private cdr:ChangeDetectorRef
    ) {}
  
    ngOnInit(): void {
      this.getOfficeStaff();
    }
  
    getOfficeStaff(): void {
      this.http.get<OfficeStaff[]>('http://localhost:8080/api/officeStaff/all')
        .subscribe({
          next: (res) => {
            this.officestaffs = res;
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error('Nurse data load error:', err);
          }
        });
    }


}
