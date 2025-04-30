import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Guest, Response } from './interfaces';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  protected offset: number = 0;
  protected isLoading: boolean = false;
  protected allLoaded: boolean = false;
  protected guests: Guest[] = [];
  protected filter: any = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email_address: '',
    phone_number: '',
    booking_reference: '',
    status: ''
  };
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.applyFilter();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !this.isLoading &&
      !this.allLoaded
    ) {
      this.applyFilter(true);
    }
  }
  
  applyFilter(append: boolean = false): void {
    if (this.isLoading || this.allLoaded) return;
    
    if (!append) {
      this.offset = 0;
      this.allLoaded = false;
      this.guests = [];
    }

    this.isLoading = true;

    let params = new HttpParams();

    if (this.offset !== 0) {
      params = params.set('offset', this.offset);
    }
    
    for (const key in this.filter) {
      if (this.filter[key]) {
        params = params.set(key, this.filter[key]);
      }
    }
    
    this.http.get<Response>('http://localhost:3000/api/guests', { params })
      .subscribe({
        next: (response) => {
          const limit: number = response.data.limit;

          if (response.data.guests.length < limit) {
            this.allLoaded = true;
          }

          this.guests = append ? [...this.guests, ...response.data.guests] : response.data.guests;
          this.offset += limit;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading guests:', err);
        }
      });
  }
}
