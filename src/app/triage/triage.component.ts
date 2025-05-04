import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-triage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './triage.component.html',
  styleUrl: './triage.component.css'
})
export class TriageComponent implements OnInit {


  triageForm!: FormGroup;

  alerts = [
    { patient: 'John Doe', priority: 'High', time: '2 mins ago' },
    { patient: 'Jane Smith', priority: 'Medium', time: '5 mins ago' },
    { patient: 'Alice Johnson', priority: 'Low', time: '10 mins ago' },
    { patient: 'Bob Brown', priority: 'High', time: '15 mins ago' },
    { patient: 'Eve Davis', priority: 'Medium', time: '20 mins ago' },
    { patient: 'Charlie White', priority: 'Low', time: '25 mins ago' },
    { patient: 'Diana King', priority: 'High', time: '30 mins ago' },
    { patient: 'Frank Lee', priority: 'Medium', time: '35 mins ago' },
    { patient: 'Grace Kim', priority: 'Low', time: '40 mins ago' },
    { patient: 'Henry Black', priority: 'High', time: '45 mins ago' }
  ];

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.triageForm = this.fb.group({
      name: ['', Validators.required],
      uhid: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      heartRate: ['', Validators.required],
      respiratoryRate: ['', Validators.required],
      bp: ['', Validators.required],
      temperature: ['', Validators.required],
      spo2: ['', Validators.required],
      complaint: ['', Validators.required],
    });
  }

  debugClick() {
    console.log('Button clicked');
  }
  
  handleSubmit() {

    console.log('Submit triggered');

    if (this.triageForm.valid) {
      console.log('Form submitted successfully:', this.triageForm.value);
  
      // this.http.post('/api/triage/predict/', this.formData).subscribe(
      //   (response: any) => {
      //     console.log('Backend Response:', response);
  
      //     const newAlert = {
      //       id: Date.now(),
      //       patient: response.name || this.formData.name,
      //       priority: response.triageLevel || 'Green',
      //       time: new Date().toLocaleTimeString(),
      //     };
  
      //     this.alerts = [newAlert, ...this.alerts];
      //     this.result = response;
      //   },
      //   (error) => {
      //     console.error('Error occurred during form submission:', error);
      //     alert('Failed to submit form data. Please try again.');
      //   }
      // );
    } else {
      console.log('Form is invalid');
      this.triageForm.markAllAsTouched();
    }
  };
}
