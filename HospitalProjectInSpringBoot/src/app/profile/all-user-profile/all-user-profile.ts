import { Component } from '@angular/core';
import { User } from '../../AllModel/user.model';
import { UserService } from '../../Service/user-service';

@Component({
  selector: 'app-all-user-profile',
  standalone: false,
  templateUrl: './all-user-profile.html',
  styleUrl: './all-user-profile.css'
})
export class AllUserProfile {


    users: User[] = [];


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.loadUsers();
  }


 
 
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log("User data loaded:", data); 
        this.users = data;
      },
      error: (err) => {
        console.error("Error fetching users", err);
      }
    });
  }

}
