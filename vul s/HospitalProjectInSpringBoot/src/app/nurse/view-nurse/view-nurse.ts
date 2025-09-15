import { ChangeDetectorRef, Component } from '@angular/core';
import { Nurse } from '../model/nurse.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-nurse',
  standalone: false,
  templateUrl: './view-nurse.html',
  styleUrl: './view-nurse.css'
})
export class ViewNurse {


  nurses: Nurse[] = [];
  
    constructor(private http: HttpClient,
      private cdr:ChangeDetectorRef
    ) {}
  
    ngOnInit(): void {
      this.getNurse();
    }
  
    getNurse(): void {
      this.http.get<Nurse[]>('http://localhost:8080/api/nurse/all')
        .subscribe({
          next: (res) => {
            this.nurses = res;
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error('Nurse data load error:', err);
          }
        });
    }

}
