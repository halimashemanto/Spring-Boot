import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Receptionist } from '../model/receptionist.model';

@Component({
  selector: 'app-view-receptionists',
  standalone: false,
  templateUrl: './view-receptionists.html',
  styleUrl: './view-receptionists.css'
})
export class ViewReceptionists {


 receptionists: Receptionist[] = [];
   
     constructor(private http: HttpClient,
       private cdr:ChangeDetectorRef
     ) {}
   
     ngOnInit(): void {
       this.getReceptionists();
     }
   
     getReceptionists(): void {
       this.http.get<Receptionist[]>('http://localhost:8080/api/receptionist/all')
         .subscribe({
           next: (res) => {
             this.receptionists = res;
             this.cdr.markForCheck();
           },
           error: (err) => {
             console.error('Nurse data load error:', err);
           }
         });
     }
 

}
