import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user:any = null; 

  constructor(private loginService:LoginService){ }

  ngOnInit(): void {
      this.user = this.loginService.getUser();
      this.loginService.getCurrentUser().subscribe(
        (user:any) => {
          this.user = user;
        },
        (error) => {
          alert("error");
        }
      )
  }

}
